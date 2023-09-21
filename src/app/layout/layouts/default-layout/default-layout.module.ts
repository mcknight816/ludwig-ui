import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout.component';
import {RouterModule} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacySlideToggleModule as MatSlideToggleModule} from "@angular/material/legacy-slide-toggle";
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

import {UserModule} from "../../common/user/user.module";

@NgModule({
    declarations: [
        DefaultLayoutComponent
    ],
    exports: [
        DefaultLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        RouterModule,
        MatDividerModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatSlideToggleModule,
        FormsModule,
        UserModule,
        FlexLayoutModule
    ]
})
export class DefaultLayoutModule { }
