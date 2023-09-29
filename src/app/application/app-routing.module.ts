import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ApplicationComponent} from "./application.component";
import {AppEditComponent} from "./app-edit/app-edit.component";
import {AppFlowComponent} from "./app-flow/app-flow.component";
import {AppOpenApiComponent} from "./app-open-api/app-open-api.component";
import {AppRequestComponent} from "./app-request/app-request.component";

const routes: Routes = [
  { path: ':appId', component: AppEditComponent },
  { path: ':appId/flows', component: AppFlowComponent },
  { path: ':appId/requests', component: AppRequestComponent },
  { path: ':appId/swagger', component: AppOpenApiComponent },
  { path: '',      component: ApplicationComponent }];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
