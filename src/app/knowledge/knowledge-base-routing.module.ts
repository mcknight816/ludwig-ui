import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {KnowledgeBaseComponent} from "./knowledge-base.component";

const routes: Routes = [
  { path: '',                           component: KnowledgeBaseComponent }];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeBaseRoutingModule { }
