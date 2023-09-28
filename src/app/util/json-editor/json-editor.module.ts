import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorComponent } from './json-editor.component';
import {FlexModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MaterialModule} from "../../material-module";
import { SchemaFormComponent } from './schema-form/schema-form.component';
import {FlowConfigService} from "../../config/flow-config.service";


@NgModule({
  declarations: [
    JsonEditorComponent,
    SchemaFormComponent,
  ],
  exports: [
    JsonEditorComponent,
    SchemaFormComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule
  ],
  providers: [FlowConfigService]
})
export class JsonEditorModule { }
