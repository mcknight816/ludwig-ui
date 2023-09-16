import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from "rxjs";
import {Plan, SaasyService} from "../../auth/saasy-service";

export interface Nonce{
    nonce: string;
    price: number;
    planId: string;
}
@Component({
  selector: 'app-bt-payment',
  templateUrl: './bt-payment.component.html',
    styleUrls  : ['./bt-payment.component.scss']
})
export class BtPaymentComponent implements OnInit {

    static COMPONENT_NAME: string | any = 'btPaymentComponent';

    @Input()
    plan:Plan;

    @Output() submit = new EventEmitter<Nonce>();

    constructor(public service:SaasyService) {

      // @ts-ignore
      window[BtPaymentComponent.COMPONENT_NAME] = this;
      this.plan = SaasyService.emptyPlan();
    }

    ngOnInit(): void {

    }
    onDropinLoaded() {
        console.log("dropin loaded...");
    }

    onPaymentStatus(response: string): void {
        if(response !== 'SUCCESS'){
            alert(response);
        }
    }

    getMyClientToken(): Observable<string> {
        // @ts-ignore
      return window[BtPaymentComponent.COMPONENT_NAME].service.getToken();
    }

    createPurchaseFunction(nonce:string,price:number): Observable<string> {
        // @ts-ignore
      if(!window[BtPaymentComponent.COMPONENT_NAME]){
            alert("No pricing data found ");
        }
        // @ts-ignore
      const planId:string = window[BtPaymentComponent.COMPONENT_NAME].plan.planId;
        // @ts-ignore
      window[BtPaymentComponent.COMPONENT_NAME].submit.emit({planId:planId,price:price,nonce:nonce});
        return of("SUCCESS");
    }

    ngOnDestroy(): void {

    }
}
