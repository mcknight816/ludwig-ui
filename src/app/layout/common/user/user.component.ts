import {  Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import {SaasyUser, SaasyUserService} from "../../../auth/saasy-user.service";
import {IdName, SaasyService} from "../../../auth/saasy-service";
import {AuthService} from "../../../auth/auth.service";



@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    exportAs       : 'user'
})
export class UserComponent implements OnInit {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = false;
    user: SaasyUser;
    tenants:Array<IdName> =[];

    constructor(private authService:AuthService,private _router: Router, private _userService: SaasyUserService, private _saasyService: SaasyService) {
        this.user = SaasyUserService.emptyUser();
    }

    ngOnInit(): void {
        this._userService.getTenantUser().subscribe(u=>{
            if(u){
                this.user = u;
            }
        })

        this._userService.userChanged().subscribe((user: SaasyUser) => {
            if(user){
                this.user = user;
            }
        });

        this._saasyService.tenantChanged().subscribe(t =>{
            this.listTenants();
        });
        //this.listTenants();

    }

    listTenants(): void{
        this._saasyService.listTenants().subscribe(t=>{
            this.tenants = t;
            if(t.length > 0 && !this.getTenant()){
                this.setTenant(t[0]);
            }
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    updateUserStatus(status: string): void {
        // Return if user is not available
        if ( !this.user ) { return;}
        // Update the user
       this._userService.updateTenantUser({...this.user, status}).subscribe(u=>{
           this.user = u;
       });
    }

    signOut(): void {
      this.authService.signOut();
        this._router.navigate(['/home']);
    }

    getTenant(): IdName {
        return  SaasyService.getTenant();
    }

    setTenant(tenant: IdName) {
        this._saasyService.setTenant(tenant);
      this._router.navigate(['/home']);
    }

    navigate(url: string) {
        this._router.navigate([url]);
    }
}
