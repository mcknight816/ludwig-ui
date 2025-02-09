import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {JsonEditorModule} from "../util/json-editor/json-editor.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MaterialModule} from "../material-module";
import {KnowledgeBaseRoutingModule} from "./knowledge-base-routing.module";
import {KnowledgeBaseService} from "./knowledge-base.service";
import {KnowledgeService} from "./knowledge-service";
import {KnowledgeBaseComponent} from "./knowledge-base.component";
import { KnowledgeBaseEditComponent } from './knowledge-base-edit/knowledge-base-edit.component';
import { KnowledgeListComponent } from './knowledge-list/knowledge-list.component';
import { KnowledgeEditComponent } from './knowledge-edit/knowledge-edit.component';
import {AceEditorModule} from "ng2-ace-editor";

@NgModule({
  declarations: [KnowledgeBaseComponent, KnowledgeBaseEditComponent, KnowledgeListComponent, KnowledgeEditComponent],
  imports: [
    KnowledgeBaseRoutingModule,
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
    MatInputModule,
    MaterialModule,
    AceEditorModule
  ],
  providers: [KnowledgeBaseService,KnowledgeService]
})
export class KnowledgeBaseModule { }
