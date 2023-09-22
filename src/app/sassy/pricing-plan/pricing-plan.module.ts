import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlanComponent } from './pricing-plan.component';

import {MatIconModule} from "@angular/material/icon";
import {MaterialModule} from "../../material-module";
import {MatButtonModule} from "@angular/material/button";

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
