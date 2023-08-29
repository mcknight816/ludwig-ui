import { Component, OnInit } from '@angular/core';
import {SaasyUser, SaasyUserService} from "../../../auth/saasy-user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {from, map, Observable} from "rxjs";
import {authConfig} from "../../../auth/auth.config";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: SaasyUser;
  userForm: FormGroup;

  constructor(private fb: FormBuilder,private saasyUserService: SaasyUserService) {
    this.user = SaasyUserService.emptyUser();
    this.userForm = ProfileComponent.createUserForm(fb,this.user);

  }

  public static createUserForm(fb: FormBuilder, user: SaasyUser): FormGroup{

    return  fb.group({
      'name': [ user.name],
      'email': [{value:user.email,disabled: true}],
      'active': [user.active]
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void{
    this.saasyUserService.getTenantUser().subscribe(t =>{
      this.user = t;
      this.userForm = ProfileComponent.createUserForm(this.fb,this.user);
    });
  }

  save(): void {
    this.saasyUserService.updateTenantUser(Object.assign(this.user, this.user,this.userForm.getRawValue())).subscribe(t=>{
      this.user = t;
      this.saasyUserService.setUser(t);
      this.userForm = ProfileComponent.createUserForm(this.fb,this.user);
    });
  }

  uploadAvatar(fileList: FileList): void {
    // Return if canceled
    if ( !fileList.length ) {return;}
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];
    // Return if the file is not allowed
    if ( !allowedTypes.includes(file.type) ) {return;}
    this.readAsDataURL(file).subscribe((p)=> {
      this.user.avatar = p;
    });
  }

  readAsDataURL(file: File): Observable<any>{
    return from(new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (): void => {resolve(reader.result);};
      reader.onerror = (e): void => {reject(e);};
      reader.readAsDataURL(file);
    })).pipe(map(path => path));
  }

  gotoKeycloak() {
    window.open(authConfig.issuer + '/account/#/security/signingin', "_blank");
  }
}
