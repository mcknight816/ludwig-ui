import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Schema} from "../json-schema-model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FlowConfig} from "../../../config/flow-config.model";
import {FlowConfigService} from "../../../config/flow-config.service";
import {AceEditorComponent} from "ng2-ace-editor";

@Component({
  selector: 'schema-form',
  templateUrl: './schema-form.component.html',
  styleUrls: ['./schema-form.component.scss']
})
export class SchemaFormComponent implements OnChanges,OnInit{
  @Input() schema: Schema | undefined;
  @Input() name: string | undefined;
  @Input() form: FormGroup;
  configs:Array<FlowConfig> = [];
  roles:Array<string> = ['Authenticated','Admin','User','Anonymous'];
  constructor(private fb: FormBuilder,private flowConfigService:FlowConfigService) {
    this.form = this.fb.group({});
  }
  ngOnInit(): void {
    this.flowConfigService.list().subscribe(fc=>{
      this.configs = fc;
    })
  }
  getValue(schema: Schema | undefined): any | undefined {
    if(schema){
      let val:any = schema.value ? schema.value : schema['default'];
      if(val && schema.format && schema.format === 'json' && val instanceof Object){
          return JSON.stringify(val);
      }
      return val;
    }
    return undefined;
  }
  getConfigs():Array<FlowConfig> {
    if(this.schema?.meta['configClass']){
      return this.configs.filter(c=>{
        return this.schema?.meta['configClass'] === c.configClass;
      });
    }
    return this.configs;
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  getFormGroup(key:string | undefined):FormGroup {
    if(key){
      return <FormGroup>this.form.get(key);
    }
    return this.form;
  }

  removeCrLfTab(text:string){
    return text.replace(/[\n\r\t]/g, "");
  }

  beautifyJson(json:string){
    return JSON.stringify(JSON.parse(json),null,'\t');
  }

  unFormatJson(editor: AceEditorComponent) {
    if(editor){
      editor.value = this.removeCrLfTab(editor?.value);
    }
  }

  formatJson(editor: AceEditorComponent) {
    if(editor){
      editor.value = this.beautifyJson(editor?.value);
    }
  }
}
