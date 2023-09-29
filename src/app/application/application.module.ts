import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { AppEditComponent } from './app-edit/app-edit.component';
import {ApplicationRoutingModule} from "./app-routing.module";
import {MaterialModule} from "../material-module";
import {ReactiveFormsModule} from "@angular/forms";
import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import { AppFlowComponent } from './app-flow/app-flow.component';
import {ConduitModule} from "../conduit/conduit.module";
import {ApplicationService} from "../services/application.service";
import { AppOpenApiComponent } from './app-open-api/app-open-api.component';
import { AppRequestComponent } from './app-request/app-request.component';
import {OpenApiService} from "../services/open-api.service";
@NgModule({
  declarations: [
    ApplicationComponent,
    AppEditComponent,
    AppFlowComponent,
    AppOpenApiComponent,
    AppRequestComponent
  ],
    imports: [
        ApplicationRoutingModule,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        MatInputModule,
        FlexModule,
        ConduitModule
    ],
    providers: [ApplicationService,OpenApiService],
})
export class ApplicationModule { }
