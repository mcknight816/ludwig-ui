import { NgModule } from '@angular/core';

import { FlowComponent } from './flow/flow.component';
import { ConduitComponent } from './conduit.component';
import {MaterialModule} from "../material-module";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {ConduitRoutingModule} from "./conduit-routing.module";
import {CommonModule} from "@angular/common";
import { ActivitiesComponent } from './activities/activities.component';
import { ConnectionDlgComponent } from './connection-dlg/connection-dlg.component';
import { FlowActivityDlgComponent } from './flow-activity-dlg/flow-activity-dlg.component';
import {JsonTreeModule} from "../util/json-tree/json-tree.module";
import {ConnectionMapperModule} from "../util/connection-mapper/connection-mapper.module";


@NgModule({
  declarations: [
    FlowComponent,
    ConduitComponent,
    ActivitiesComponent,
    ConnectionDlgComponent,
    FlowActivityDlgComponent
  ],
  imports: [
    ConduitRoutingModule,
    MaterialModule,
    FlexModule,
    FlexLayoutModule,
    CommonModule,
    JsonTreeModule,
    ConnectionMapperModule
  ]
})
export class ConduitModule { }
