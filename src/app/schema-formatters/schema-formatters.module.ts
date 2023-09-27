import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigChooserComponent } from './config-chooser/config-chooser.component';
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FlowConfigService} from "../config/flow-config.service";
import { RoleChooserComponent } from './role-chooser/role-chooser.component';
@NgModule({
  declarations: [
    ConfigChooserComponent,
    RoleChooserComponent
  ],
  exports: [
    ConfigChooserComponent,
    RoleChooserComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [FlowConfigService]
})
export class SchemaFormattersModule { }
