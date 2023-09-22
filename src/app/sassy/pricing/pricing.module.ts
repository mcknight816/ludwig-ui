import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import {PricingComponent} from './pricing.component';
import {pricingRoutes} from './pricing.routing';
import {PricingPlanModule} from "../pricing-plan/pricing-plan.module";

import {MaterialModule} from "../../material-module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        PricingComponent
    ],
    exports: [
        PricingComponent
    ],
    imports: [
        RouterModule.forChild(pricingRoutes),
        MatButtonModule,
        MatIconModule,
        MaterialModule,
        PricingPlanModule,
      FlexLayoutModule,
    ]
})
export class PricingModule
{
}
