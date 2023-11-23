import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Config} from "./config";
import {ThemeService} from "./theme.service";
import {FlowService} from "./flow.service";
import {FlowTemplateService} from "./flow-template.service";

@NgModule({
  providers: [
    ThemeService,
		FlowService,
    FlowTemplateService
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
