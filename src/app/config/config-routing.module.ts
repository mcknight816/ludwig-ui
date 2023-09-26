import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {ConfigEditComponent} from "./config-edit/config-edit.component";
import {ConfigComponent} from "./config.component";

const routes: Routes = [
  { path: 'edit/:configType/:configId', component: ConfigEditComponent },
  { path: 'edit/:configType',           component: ConfigEditComponent },
  { path: '',                           component: ConfigComponent }];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
