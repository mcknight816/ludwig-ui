import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { MaterialModule} from "../material-module";
import { DocItemComponent } from './doc-item/doc-item.component';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import { MarkedPipe} from "./service/marked.pipe";

@NgModule({
  declarations: [DocsComponent, DocItemComponent, MarkedPipe],
  imports: [
    CommonModule,
    DocsRoutingModule,
    MaterialModule,
    FlexModule,
    FlexLayoutModule
  ],
  exports: [
    MarkedPipe
  ],
})
export class DocsModule { }
