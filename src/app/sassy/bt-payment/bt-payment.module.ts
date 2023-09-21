import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

        HttpClientModule
    ]
})
export class BtPaymentModule { }
