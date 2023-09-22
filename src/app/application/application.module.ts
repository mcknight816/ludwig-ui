import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { AppEditComponent } from './app-edit/app-edit.component';
import {ApplicationRoutingModule} from "./app-routing.module";

import {MaterialModule} from "../material-module";
import {ReactiveFormsModule} from "@angular/forms";

import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    ApplicationComponent,
    AppEditComponent
  ],
  imports: [
    ApplicationRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexModule
  ]
})
export class ApplicationModule { }
