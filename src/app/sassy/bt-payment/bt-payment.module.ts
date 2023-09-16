import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxBraintreeModule} from "ngx-braintree";
import {HttpClientModule} from "@angular/common/http";
import {BtPaymentComponent} from "./bt-payment.component";

@NgModule({
    declarations: [
        BtPaymentComponent
    ],
    exports: [
        BtPaymentComponent
    ],
    imports: [
        CommonModule,
        NgxBraintreeModule,
        HttpClientModule
    ]
})
export class BtPaymentModule { }
