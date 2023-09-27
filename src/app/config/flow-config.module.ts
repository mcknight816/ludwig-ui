import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowConfigComponent } from './flow-config.component';
import { ConfigEditComponent } from './config-edit/config-edit.component';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlowConfigService} from "./flow-config.service";
import {ActivityConfigService} from "./activity-config.service";
import {FlowConfigRoutingModule} from "./flow-config-routing.module";
import {JsonEditorModule} from "../util/json-editor/json-editor.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
@NgModule({
  declarations: [
    FlowConfigComponent,
    ConfigEditComponent
  ],
  imports: [
    FlowConfigRoutingModule,
    CommonModule,
    ExtendedModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    JsonEditorModule,
    FlexModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [FlowConfigService,ActivityConfigService]
})
export class FlowConfigModule { }
