import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import {CommonModule} from "@angular/common";
import {SettingsComponent} from "./settings.component";
import {SettingsPlanBillingComponent} from "./plan-billing/plan-billing.component";
import {SettingsTeamComponent} from "./team/team.component";
import {settingsRoutes} from "./settings.routing";
import {BtPaymentModule} from "../bt-payment/bt-payment.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SettingsAccountComponent} from "./account/account.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatTableModule} from "@angular/material/table";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        SettingsComponent,
        SettingsAccountComponent,
        SettingsPlanBillingComponent,
        SettingsTeamComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(settingsRoutes),
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatListModule,
        BtPaymentModule,
        FlexLayoutModule,
        FormsModule,
        MatTableModule
    ]
})
export class SettingsModule
{
}
