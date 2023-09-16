import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {Nonce} from "../bt-payment/bt-payment.component";
import {App, Plan, SaasyService, SaasySubscription} from "../../auth/saasy-service";
import {SaasyUserService} from "../../auth/saasy-user.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html'
})
export class SubscribeComponent implements OnInit {

    pricingData : Plan;
    monthly:boolean=false;
    paymentResponse: any;
    subscription:SaasySubscription;
    app:App | null = null;

    constructor(private activatedRoute: ActivatedRoute,private router: Router,public service:SaasyService,private saasyUserService:SaasyUserService) {
        this.pricingData = SaasyService.emptyPlan();
        this.subscription = SaasyService.emptySubscription();
        this.subscription.planId = this.pricingData.planId;
        this.subscription.appId = environment.appId;
    }

    ngOnInit() {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.service.getApp().subscribe((a)=>{
           this.app = a;
            if(id){
               let plans:Plan[] =  this.app.plans.filter(p=> p.planId === id);
               this.pricingData = plans[0];
                this.saasyUserService.getTenantUser().subscribe(tu=>{
                    let name:Array<string> = tu.name.split(" ");
                    this.subscription.email = tu.email;
                    this.subscription.chargeAmount =this.pricingData.monthly;
                    this.subscription.appId = environment.appId;
                    this.subscription.firstName = name[0];
                    this.subscription.lastName = name[1];
                    this.subscription.companyName = tu.name;
                });
            }
        });
    }
    ngOnDestroy(): void {

    }

    pay(nonce:Nonce) {
        this.subscription.planId = nonce.planId;
        this.subscription.nonce = nonce.nonce;
        this.subscription.chargeAmount = nonce.price;
        this.service.pay(this.subscription).subscribe(()=>{
           this.router.navigate(['/dashboards/project']).then();
        });
    }
}
