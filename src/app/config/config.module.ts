import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
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
import {ConfigService} from "./config.service";
import {ActivityConfigService} from "./activity-config.service";
import {ConfigRoutingModule} from "./config-routing.module";
import {JsonEditorModule} from "../util/json-editor/json-editor.module";
@NgModule({
  declarations: [
    ConfigComponent,
    ConfigEditComponent
  ],
  imports: [
    ConfigRoutingModule,
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
    FlexModule
  ],
  providers: [ConfigService,ActivityConfigService]
})
export class ConfigModule { }
