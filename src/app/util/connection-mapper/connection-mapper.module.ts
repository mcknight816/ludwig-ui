import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionMapperComponent } from './connection-mapper.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    ConnectionMapperComponent
  ],
  exports: [
    ConnectionMapperComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule
  ]
})
export class ConnectionMapperModule { }
