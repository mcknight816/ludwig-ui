import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, of, switchMap} from 'rxjs';

import {IdName, SaasyService} from './saasy-service';
import {environment} from "../../environments/environment";

const USER_KEY = 'auth-user';

export interface SaasyUser {
    id: string;
    name: string;
    email: string;
    tenantId: string;
    avatar?: string;
    status?: string;
    active: boolean;
    isCustomer:boolean;
    roles: Array<string>;
}
@Injectable({
    providedIn: 'root'
})
export class SaasyUserService {
    private userChanged$ = new BehaviorSubject<SaasyUser>(SaasyUserService.getStoredUser());
    constructor(private _httpClient: HttpClient,private saasyService:SaasyService) {}
    /*
         Tenants Users
     */
    headers(): Observable<any> {
        return this._httpClient.get<any>(environment.saasy + '/' + environment.appId + '/headers');
    }

    listTenantUsers(tenantId: string | null): Observable<Array<SaasyUser>> {
        const params = new HttpParams();
        if(tenantId != null){
          params.set('tenantId',tenantId);
        }
        return this._httpClient.get<Array<SaasyUser>>(environment.saasy + '/' + environment.appId + '/tenant-user/search',{params});
    }

    saveTenantUser(saasyUser: SaasyUser): Observable<SaasyUser> {
        return this._httpClient.post<SaasyUser>(environment.saasy + '/' + environment.appId + '/tenant-user/' + SaasyService.getTenant().id, saasyUser).pipe(switchMap((su)=>{
            return of(su);
        }));
    }

    updateTenantUser(user: SaasyUser): Observable<SaasyUser> {
        return this._httpClient.patch<SaasyUser>(environment.saasy + '/' + environment.appId + '/tenant-user', user).pipe(switchMap((su)=>{
            return of(su);
        }));
    }

    public userChanged(): Observable<SaasyUser>{
        return this.userChanged$;
    }

    public deleteSaasyUser(id:string):Observable<void>{
        return this._httpClient.delete<void>(environment.saasy + '/' + environment.appId + '/tenant-user/' + id);
    }

    public getTenantUser(): Observable<SaasyUser> {
        const u: SaasyUser = SaasyUserService.getStoredUser();
        const t: IdName = SaasyService.getTenant();
       return u && t && u.tenantId && u.tenantId === t.id  ? of(u) : this.me();
    }

    private me(): Observable<SaasyUser> {
       const t: IdName = SaasyService.getTenant();
       return this._httpClient.post<SaasyUser>(environment.saasy + '/' + environment.appId + '/me/' + t.id, {tenantId: t.id}).pipe(switchMap((su) => {
           this.setUser(su);
           return of(su);
       }));
    }

    public setUser(user: SaasyUser){
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        const t: IdName = SaasyService.getTenant();
        if(t.id !== user.tenantId){
            this.saasyService.listTenants().subscribe(tl=>{
                tl = tl.filter((t)=>t.id === user.tenantId);
                if(tl.length > 0 ){
                    this.saasyService.setTenant(tl[0]);
                }
            });
        }
        this.userChanged$.next(user);
    }

    private static getStoredUser(): SaasyUser {
        const user = window.sessionStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    public getRoles(): Array<string> {
        return SaasyUserService.getStoredUser().roles;
    }

    public hasRole(role: string): boolean{
        return this.getRoles() ? this.getRoles().indexOf(role) !== -1 : false;
    }
    isTenant(){
       return SaasyUserService.getStoredUser().isCustomer;
    }

    static emptyUser(): SaasyUser {
        return {
            id: '',
            name: '',
            email: '',
            tenantId: '',
            avatar: '',
            status: '',
            active: false,
            isCustomer:false,
            roles: []
        };
    }

}
