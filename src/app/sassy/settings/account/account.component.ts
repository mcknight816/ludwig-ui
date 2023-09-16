import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {SaasyService, Tenant} from "../../../auth/saasy-service";
import {SaasyUser} from "../../../auth/saasy-user.service";


@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    styleUrls      : ['./account.component.scss']
})
export class SettingsAccountComponent implements OnInit {

    tenant:Tenant;
    tenantForm:FormGroup;

    constructor(private fb: FormBuilder,private saasyService:SaasyService) {
        this.tenant = SaasyService.emptyTenant();
        this.tenantForm = SettingsAccountComponent.createTenantForm(fb,this.tenant);
    }

    ngOnInit(): void {
        this.saasyService.getTenantById(SaasyService.getTenant().id).subscribe(t=>{
            this.tenant = t;
            this.tenantForm = SettingsAccountComponent.createTenantForm(this.fb,this.tenant);
        });
    }

    private static createTenantForm(fb: FormBuilder, tenant: Tenant) {
        return  fb.group({
            "app":[tenant.app],
            "displayName": [ tenant.displayName],
            "customer": SettingsAccountComponent.createUserForm(fb,tenant.customer)
        });
    }

    private static createUserForm(fb: FormBuilder, user: SaasyUser){
        return  fb.group({
            "name": [ user.name],
            "email": [ {value:user.email,disabled: true}],
            "active": [user.active]
        });
    }

    save() {
        this.saasyService.saveTenant(Object.assign(this.tenant, this.tenant,this.tenantForm.getRawValue())).subscribe(t=>{
            this.tenant = t;
            this.saasyService.setTenant({id:t.id,name:t.displayName});
        });
    }
}
