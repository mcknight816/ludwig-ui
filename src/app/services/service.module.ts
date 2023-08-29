import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Config} from "./config";
import {ThemeService} from "./theme.service";
import {FlowService} from "./flow.service";

@NgModule({
  providers: [
    ThemeService,
		FlowService,

  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule {
  public static forRoot(environment: any): Config{
    return new Config(environment);
  }
}
