import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeComponent } from './subscribe.component';
import {RouterModule} from "@angular/router";

import {MatIconModule} from "@angular/material/icon";

import {MatStepperModule} from "@angular/material/stepper";
import {HttpClientModule} from "@angular/common/http";
import {BtPaymentModule} from "../bt-payment/bt-payment.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";


const routes = [
    { path     : '', component: SubscribeComponent}
];
@NgModule({
    declarations: [SubscribeComponent],
    exports: [
        SubscribeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        HttpClientModule,
        BtPaymentModule,
        MatDividerModule

    ]
})
export class SubscribeModule { }
