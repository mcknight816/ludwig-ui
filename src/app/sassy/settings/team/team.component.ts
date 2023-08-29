import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';
import {SaasyUser, SaasyUserService} from "../../../auth/saasy-user.service";
import {SaasyService} from "../../../auth/saasy-service";

@Component({
    selector       : 'settings-team',
    templateUrl    : './team.component.html',
    styleUrls      : ['./team.component.scss']
})
export class SettingsTeamComponent implements OnInit {
    members: SaasyUser[] = [];
    roles: string[] = [];
    form: FormGroup;
    memberColumns: string[] = ['avatar', 'name', 'roles', 'active', 'action'];
    mobileColumns: string[] = [ 'name', 'active', 'action'];
    @Input()
    mobile:boolean = false;

    constructor(private fb: FormBuilder,private saasyUserService: SaasyUserService,private saasyService: SaasyService) {
        this.form = SettingsTeamComponent.createUserForm(fb,SaasyUserService.emptyUser());
    }

    ngOnInit(): void {
        this.listTenantUsers();
        this.saasyService.getApp().subscribe((app)=>{
            this.roles = app.roles;
        });
        this.saasyUserService.headers().subscribe(d=>{

        });
    }

    private static createUserForm(fb: FormBuilder, user: SaasyUser){
        return  fb.group({
            'name': [ user.name],
            'email': [ user.email]
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    listTenantUsers(): void{
        this.saasyUserService.listTenantUsers(SaasyService.getTenant().id).subscribe((users)=>{
            this.members = users;
        });
    }

    createUser(): void {
        this.saveUser(this.form.getRawValue());
    }

    saveUser(user: SaasyUser): void{
        this.saasyUserService.saveTenantUser(user).subscribe((u)=>{
            this.listTenantUsers();
        });
    }

    changeActive($event: any, user: SaasyUser) {
        if($event) {
          user.active = !user.active ;
          this.saveUser(user);
        }
    }

    changeRoles($event: MatSelectChange,user: SaasyUser): void {
        if($event) {
          user.roles = $event.source.value;
            this.saveUser(user);
        }
    }

    deleteUser(id : string) {
        this.saasyUserService.deleteSaasyUser(id).subscribe(()=>{
            this.listTenantUsers();
        });
    }
}
