import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {App, Plan, SaasyService, SaasySubscription, Tenant, Transaction} from "../../../auth/saasy-service";
import {SaasyUserService} from "../../../auth/saasy-user.service";
import {environment} from "../../../../environments/environment";
import {Nonce} from "../../bt-payment/bt-payment.component";

@Component({
    selector       : 'settings-plan-billing',
    templateUrl    : './plan-billing.component.html',
    styleUrls      : ['./plan-billing.component.scss'],
    encapsulation  : ViewEncapsulation.None,
})
export class SettingsPlanBillingComponent implements OnInit {

    app:App;
    tenant:Tenant;
    subscription:any = {planId:''};
    cards:Array<any> = [];
    selectedPlanId:string | null;
    saasySubscription:SaasySubscription;
    showPayment:boolean = false;
    subscriptionStatus:string = '';
    transactionHistory:Array<Transaction> = [];
    displayedColumns: string[] = ['createdAt', 'maskedNumber', 'processorResponseText', 'amount'];
    paymentMethodColumns: string[] = ['imageUrl', 'cardholderName', 'maskedNumber', 'expirationDate','active', 'action'];
    planColumns: string[] = ['id', 'name', 'description', 'monthly', 'active', 'action'];

    mobileDisplayedColumns: string[] = [ 'maskedNumber', 'processorResponseText', 'amount'];
    mobilePaymentMethodColumns: string[] = ['maskedNumber', 'active', 'action'];
    mobilePlanColumns: string[] = [ 'name', 'monthly', 'active', 'action'];

    @Input()
    mobile:boolean = false;

    constructor(private _formBuilder: FormBuilder,private saasyService:SaasyService,private saasyUserService:SaasyUserService) {
        this.tenant = SaasyService.emptyTenant();
        this.app = SaasyService.emptyApp();
        this.selectedPlanId = 'bronze';
        this.saasySubscription = SaasyService.emptySubscription();
    }

    update() {
        const plan:Plan = this.app.plans.filter(p=> p.planId === this.selectedPlanId)[0];
       if(!this.subscription || plan.planId !== this.subscription.planId){
            this.saasySubscription.planId = plan.planId;
            this.saasySubscription.chargeAmount = plan.monthly;

            this.saasyService.updateSubscription(this.tenant.id,this.saasySubscription).subscribe(()=>{
                this.ngOnInit();
            });
        }
    }

    getSelectPlan():Plan{
        return this.app.plans.filter(p=> p.planId === this.selectedPlanId)[0];
    }

    cancelSubscription() {
        this.saasyService.cancelSubscription(SaasyService.getTenant()?.id).subscribe((c)=>{
            console.log(c);
            this.ngOnInit();
        })
    }

    ngOnInit(): void {

        this.saasyService.getTransactionHistory(SaasyService.getTenant().id).subscribe(s=>{
            this.transactionHistory = s;
        });

        this.saasyService.getApp().subscribe((a)=>{
           this.app = a;
           this.selectedPlanId = this.app.plans[0].planId;
        });

        this.saasyService.getTenantById(SaasyService.getTenant().id).subscribe((t)=>{
            this.tenant = t;
            this.saasySubscription.id = t.subscriptionId;
            this.saasySubscription.companyName = t.displayName;
            this.saasyService.getSubscription(t.id).subscribe((s)=>{
                if(s){
                    this.subscriptionStatus = s.status;
                    this.subscription = s;
                }
            });
        });

        this.saasyService.getCardsOnFile(SaasyService.getTenant().id).subscribe((t)=>{
            this.cards = t;
            if(t.length === 0){
                this.showPayment = true;
            }
        });

        this.saasyUserService.getTenantUser().subscribe(tu=>{
            let name:Array<string> = tu.name.split(" ");
            this.saasySubscription.email = tu.email;
            this.saasySubscription.chargeAmount = this.getSelectPlan()?.monthly;
            this.saasySubscription.appId = environment.appId;
            this.saasySubscription.firstName = name[0];
            this.saasySubscription.lastName = name[1];
        });

    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    pay(nonce:Nonce) {
        this.saasySubscription.nonce = nonce.nonce;
        this.saasySubscription.planId = nonce.planId;
        this.saasySubscription.chargeAmount = nonce.price;
        this.saasyService.updateSubscription(this.tenant.id,this.saasySubscription).subscribe(()=>{
            this.saasySubscription.nonce = '';
            this.ngOnInit();
        });
    }

    removePaymentMethod(token:string) {
        this.saasyService.removePaymentMethod(SaasyService.getTenant().id,token).subscribe((p)=>{
            this.cards  = p;
            this.ngOnInit();
        });
    }

    setDefaultPaymentMethod(token:string){
        this.saasyService.setDefaultPaymentMethod(SaasyService.getTenant().id,token).subscribe((p)=>{
            this.cards  = p;
            this.ngOnInit();
        });
    }

    changeMethodOfPayment() {
        this.showPayment = true;
    }


    selectPlan(plan: Plan) {
       this.selectedPlanId = plan.planId;
       this.update();
    }

    compare() {
        return function (p1: any, p2: any) {
            return p1.default ? -1 : 1;
        };
    }

    getStatus() {
        return this.isActive() ? 'Active' : this.subscriptionStatus;
    }

    isActive(){
        return this.subscriptionStatus.toLowerCase() === 'Active'.toLowerCase() || this.subscriptionStatus.toLowerCase() === 'Pending'.toLowerCase();
    }
}
