import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {CallbackComponent} from "./callback/callback.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {FlowFormComponent} from "./flow-form/flow-form.component";
import {FlowTableComponent} from "./flow-table/flow-table.component";

import {LayoutComponent} from "./layout/layout.component";
const routes: Routes = [
    {path : '',                pathMatch : 'full', redirectTo: 'home'},
    {path : '',                component: LayoutComponent,
        children:[
            {path : 'home',        component: HomeComponent},
            {path : 'dashboard',   component: DashboardComponent},
            {path : 'callback',    component: CallbackComponent},
            {path : 'docs',        loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule) },
            {path : 'conduit',     loadChildren: () => import('./conduit/conduit.module').then(m => m.ConduitModule),canActivate: [AuthGuard] },
            {path : 'apps',         loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),canActivate: [AuthGuard] }
    ]},

    {path : '',                component: LayoutComponent,
        children:[
          {path : 'flow',     			component:FlowFormComponent},
          {path : 'flow/:id',     	component:FlowFormComponent},
          {path : 'flows',     			component:FlowTableComponent},
    ]},
    {path : '',                component: LayoutComponent,
        children:[
            {path : 'settings',        loadChildren: () => import('./sassy/settings/settings.module').then(m => m.SettingsModule),canActivate: [AuthGuard]},
            {path : 'subscribe/:id',   loadChildren: () => import('./sassy/subscribe/subscribe.module').then(m => m.SubscribeModule),canActivate: [AuthGuard]},
            {path : 'pricing',         loadChildren: () => import('./sassy/pricing/pricing.module').then(m => m.PricingModule) },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
