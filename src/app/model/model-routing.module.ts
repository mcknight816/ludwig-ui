import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ModelListComponent} from "./model-list/model-list.component";
import {AuthGuard} from "../auth/guards/auth.guard";
import {ModelEditComponent} from "./model-edit/model-edit.component";

const routes: Routes = [
  {path : '',                 component: ModelListComponent,canActivate: [AuthGuard]},
  {path : 'model',            component: ModelEditComponent,canActivate: [AuthGuard]},
  {path : 'model/:id',        component: ModelEditComponent,canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule { }
