import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JsonTreeComponent} from "./json-tree.component";
import {JsonNodeComponent} from "./json-node.component";

@NgModule({
  declarations: [JsonTreeComponent, JsonNodeComponent],
  exports: [
    JsonTreeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JsonTreeModule { }
