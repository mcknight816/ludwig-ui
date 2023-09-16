import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ConduitComponent} from "./conduit.component";

const routes: Routes = [
  { path: ':flowId', component: ConduitComponent },
  { path: '', component: ConduitComponent }];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConduitRoutingModule { }
