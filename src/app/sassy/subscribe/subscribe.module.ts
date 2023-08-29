import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeComponent } from './subscribe.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {HttpClientModule} from "@angular/common/http";
import {BtPaymentModule} from "../bt-payment/bt-payment.module";


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
        BtPaymentModule

    ]
})
export class SubscribeModule { }
