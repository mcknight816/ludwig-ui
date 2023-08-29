import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {SaasyUserService} from "../saasy-user.service";

@Injectable({
    providedIn: 'root'
})
export class SaasyAdminGuard implements CanActivate{

    constructor(private saasyUserService:SaasyUserService,private route: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._check('page/profile');
    }

    private _check(redirectURL: string): Observable<boolean> {
        if(!this.saasyUserService.hasRole("ADMIN")){
            this.route.navigateByUrl(redirectURL).then();
            return of(false);
        }
        return of(true);
    }

}
