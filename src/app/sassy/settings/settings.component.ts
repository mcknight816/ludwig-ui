import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {Subject } from 'rxjs';
import {SaasyUserService} from "../../auth/saasy-user.service";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
    selector       : 'settings',
    templateUrl    : './settings.component.html',
    styleUrls      : ['./settings.component.scss'],
    encapsulation  : ViewEncapsulation.None
})
export class SettingsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('sidenav') sidenav!: MatSidenav;
    panels: any[] = [];
    selectedPanel: string = 'profile';
    mobile:boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private observer: BreakpointObserver,private saasyUserService:SaasyUserService) {
      this.mobile = false;

    }

    ngOnInit(): void {

        // Setup available panels
        this.panels = [
            {
              id         : 'profile',
              icon       : 'person',
              title      : 'Profile',
              description: 'Manage your public profile and private information'
            },
        ];
        if(this.isAdmin()){
          this.panels.push(
            {
              id         : 'team',
              icon       : 'groups',
              title      : 'Users',
              description: 'Manage your existing users and change roles/permissions'
            }
          );
        }
        if(this.isCustomer()){
            this.panels.push(
                {
                  id         : 'account',
                  icon       : 'account_circle',
                  title      : 'Account',
                  description: 'Manage your subscription account information'
                },
                {
                    id         : 'plan-billing',
                    icon       : 'credit_card',
                    title      : 'Plan & Billing',
                    description: 'Manage your subscription plan, payment method and billing information'
                }
            )
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    isCustomer() {
       return this.saasyUserService.isTenant();
    }

    isAdmin() : boolean{
      return this.saasyUserService.getRoles().filter(t=> t.toLowerCase() === 'admin').length > 0;
    }

    selectPanel(panel: any) {
      this.selectedPanel = panel.id;
    }

    ngAfterViewInit() {
       setTimeout(() => { // prevent expression has changed after it was checked
         this.observer.observe(['(max-width: 700px)']).subscribe((res) => {
            if (res.matches) {
                this.sidenav.mode = 'over';
                this.sidenav.close().then();
                this.mobile = true;
            } else {
                this.sidenav.mode = 'side';
                this.sidenav.open().then();
                this.mobile = false;
            }
        });
       });
    }

    sideNavClick() {
        if(this.sidenav.mode === 'over' ){
            this.sidenav.toggle().then();
        }
    }

}
