import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorComponent } from './json-editor.component';
import {FlexModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MaterialModule} from "../../material-module";
import { SchemaFormComponent } from './schema-form/schema-form.component';
import { FormatterComponent } from './formatter/formatter.component';
import {SchemaFormattersModule} from "../../schema-formatters/schema-formatters.module";


@NgModule({
  declarations: [
    JsonEditorComponent,
    SchemaFormComponent,
    FormatterComponent,

  ],
  exports: [
    JsonEditorComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    SchemaFormattersModule
  ]
})
export class JsonEditorModule { }
