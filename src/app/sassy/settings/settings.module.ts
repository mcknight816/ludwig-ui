import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
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
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
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
