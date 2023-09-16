import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlanComponent } from './pricing-plan.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MaterialModule} from "../../material-module";

@NgModule({
    declarations: [
        PricingPlanComponent
    ],
    exports: [
        PricingPlanComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
      MaterialModule,
    ]
})
export class PricingPlanModule { }
