import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntityListComponent} from "./entity-list/entity-list.component";
import {FieldListComponent} from "./field-list/field-list.component";
import {ModelEditComponent} from "./model-edit/model-edit.component";
import {ModelListComponent} from "./model-list/model-list.component";
import {MaterialModule} from "../material-module";
import {ModelImportComponent} from "./model-import/model-import.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AceEditorModule} from "ng2-ace-editor";
import {ModelRoutingModule} from "./model-routing.module";
import {ModelService} from "./model";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {Clipboard, ClipboardModule} from "@angular/cdk/clipboard";



@NgModule({
  declarations: [EntityListComponent, FieldListComponent, ModelEditComponent, ModelListComponent, ModelImportComponent],
  imports: [
    ModelRoutingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AceEditorModule,
    FlexModule,
    ExtendedModule,
    ClipboardModule
  ],
  providers: [ ModelService, Clipboard]
})
export class ModelModule { }
