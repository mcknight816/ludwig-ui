import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Plan, SaasyService} from "../../auth/saasy-service";


@Component({
    selector       : 'pricing',
    templateUrl    : './pricing.component.html',
    styleUrls      : ['./pricing.component.scss'],
    encapsulation  : ViewEncapsulation.None,
})
export class PricingComponent implements OnInit
{
    yearlyBilling: boolean = true;
    plans:Array<Plan>=[];
    /**
     * Constructor
     */
    constructor(private saasyService:SaasyService) {

    }

    ngOnInit(): void {
        this.saasyService.getApp().subscribe(a=>{
            this.plans = a.plans;
        });
    }
}
