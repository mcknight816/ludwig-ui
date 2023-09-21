import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeComponent } from './subscribe.component';
import {RouterModule} from "@angular/router";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
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
