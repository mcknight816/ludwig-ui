import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ApplicationComponent} from "./application.component";
import {AppEditComponent} from "./app-edit/app-edit.component";

const routes: Routes = [
  { path: 'app:appId', component: AppEditComponent },
  { path: 'apps',      component: ApplicationComponent }];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
