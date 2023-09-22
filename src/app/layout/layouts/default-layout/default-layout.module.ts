import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout.component';
import {RouterModule} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";

import {MatIconModule} from "@angular/material/icon";

import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

import {UserModule} from "../../common/user/user.module";
import {MatListModule} from "@angular/material/list";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";


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
