import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { AppEditComponent } from './app-edit/app-edit.component';
import {ApplicationRoutingModule} from "./app-routing.module";
import {ConduitModule} from "../conduit/conduit.module";

import {MaterialModule} from "../material-module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    ApplicationComponent,
    AppEditComponent
  ],
  imports: [
    ApplicationRoutingModule,
    CommonModule,
    ConduitModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexModule
  ]
})
export class ApplicationModule { }
