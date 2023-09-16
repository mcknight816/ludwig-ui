import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import {Observable, of, Subject, switchMap} from 'rxjs';

import {SaasyUserService} from "../saasy-user.service";
import {AuthService} from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    private activateUser = new Subject();
    constructor(private _authService: AuthService, private _router: Router,private saasyUserService:SaasyUserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this._check('/');
    }

    private _check(redirectURL: string): Observable<boolean> {
        return this._authService.check().pipe(switchMap((authenticated) => {
               if ( !authenticated ) {
                   this._authService.signIn(redirectURL);
                   return of(false);
               }
               return this.userCheck(redirectURL);
           })
       );
    }

    private userCheck(redirectURL: string): Observable<boolean> {
        return  this.saasyUserService.getTenantUser().pipe(switchMap((u)=>{
            if(!u.tenantId && redirectURL !== '/' && !redirectURL.startsWith('/subscribe')){
                this._router.navigateByUrl('/pricing');
            }
            return of(true);
        }));
    }

    listenForActivateUser() {
      return this.activateUser.asObservable();
    }
}
