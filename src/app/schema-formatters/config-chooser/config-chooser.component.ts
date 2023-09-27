import {Component, Input, OnInit} from '@angular/core';
import {Schema} from "../../util/json-editor/json-schema-model";
import {FlowConfigService} from "../../config/flow-config.service";
import {FlowConfig} from "../../config/flow-config.model";

@Component({
  selector: 'config-chooser',
  templateUrl: './config-chooser.component.html',
  styleUrls: ['./config-chooser.component.scss']
})
export class ConfigChooserComponent implements OnInit{
  @Input() schema:Schema | undefined;
  @Input() name:string | undefined;
  configs:Array<FlowConfig> = [];

  constructor(private flowConfigService:FlowConfigService) {

  }
  getValue(schema: Schema | undefined): any | undefined {
    if(schema){
      return schema?.value ?  schema?.value : schema['default'];
    }
    return undefined;
  }

  ngOnInit(): void {
    this.flowConfigService.list().subscribe(fc=>{
      this.configs = fc;
    })
  }

  getConfigs():Array<FlowConfig> {
    if(this.schema?.meta['configClass']){
      return this.configs.filter(c=>{
        return this.schema?.meta['configClass'] === c.configClass;
      });
    }
    return this.configs;
  }
}
