import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {ConfigEditComponent} from "./config-edit/config-edit.component";
import {FlowConfigComponent} from "./flow-config.component";

const routes: Routes = [
  { path: 'edit/:configType/:configId', component: ConfigEditComponent },
  { path: 'edit/:configType',           component: ConfigEditComponent },
  { path: '',                           component: FlowConfigComponent }];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowConfigRoutingModule { }
