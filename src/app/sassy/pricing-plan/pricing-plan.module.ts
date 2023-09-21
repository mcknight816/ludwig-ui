import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlanComponent } from './pricing-plan.component';
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
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
