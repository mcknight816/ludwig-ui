import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, Observable, of} from 'rxjs';
import { AuthConfig, OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {AuthUtils} from "./auth.utils";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
    private _authenticated: boolean = false;
    private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);

    constructor(private _httpClient: HttpClient, private oauthService: OAuthService){

        this.oauthService.events.subscribe((event) => {
            if (event instanceof OAuthErrorEvent) {
                console.error('OAuthErrorEvent Object:', event);
            }
        });

        this.oauthService.events.subscribe((_) => {
            this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
        });

        this.oauthService.events.pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
            .subscribe(e => alert(e));

        this.oauthService.setupAutomaticSilentRefresh();
    }
    get accessToken(): string { return this.oauthService.getAccessToken(); }
    get refreshToken(): string { return this.oauthService.getRefreshToken(); }
    get identityClaims(): any { return this.oauthService.getIdentityClaims(); }
    get idToken(): string { return this.oauthService.getIdToken(); }
    get logoutUrl(): string | undefined { return this.oauthService.logoutUrl; }
    check(): Observable<boolean> {
        if ( this._authenticated ) { return of(true);}
        if (!this.hasValidToken() ) { return of(false);}
        if (AuthUtils.isTokenExpired(this.accessToken)) { return of(false);}
        return  of(true);
    }

    public runInitialLoginSequence(): Promise<void> {
        return this.oauthService.loadDiscoveryDocument()
            .then(() => this.oauthService.tryLogin())
            .then(() => this.oauthService.hasValidAccessToken() ? Promise.resolve() : this.silentRefresh() )
            .catch(() => this.isDoneLoadingSubject$.next(true));
    }

    public signIn(redirectURL?: string): void{
        this.oauthService.initLoginFlow(redirectURL || '/');
    }

    public signOut(): void{
        this.oauthService.revokeTokenAndLogout(()=>{});
        sessionStorage.clear();
        this.oauthService.logOut();
    }

    redirect(p:any):Observable<any>{
        return new Observable<any>( t => {
            t.next({isUrl:true,loc:p.state?.split(';')[1]});
        });
    }

    public configure(authConfig: AuthConfig): void{
        this.oauthService.configure(authConfig);
    }

    public refresh(): void { this.oauthService.silentRefresh().then(); }
    public hasValidToken(): boolean { return this.oauthService.hasValidAccessToken(); }

    public silentRefresh(): Promise<void>{
        return this.oauthService.silentRefresh()
            .then(() => Promise.resolve())
            .catch((result) => {
                const errorResponsesRequiringUserInteraction = ['interaction_required', 'login_required', 'account_selection_required', 'consent_required',];
                if (result && result.reason && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {
                    console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
                    return Promise.resolve();
                }
                return Promise.reject(result);
            });
    }
}
