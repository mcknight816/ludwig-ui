import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlowConfigService} from "../flow-config.service";
import {Schema} from "../../util/json-editor/json-schema-model";
import {ActivityConfigService} from "../activity-config.service";
import {FlowConfig} from "../flow-config.model";
import {JsonEditorComponent} from "../../util/json-editor/json-editor.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.scss']
})
export class ConfigEditComponent implements AfterViewInit  {
  @ViewChild(JsonEditorComponent) jsonEditor:JsonEditorComponent | undefined;
  @Input() flowConfig: FlowConfig | undefined;
  @Input() schema: Schema | undefined;

  configType: string = '';
  form:FormGroup;
  constructor(private fb: FormBuilder, private service:FlowConfigService, private activityConfigService: ActivityConfigService, private router: Router, private route: ActivatedRoute) {
    this.form = fb.group({
      name:[]
    });
  }

  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('configId');
    let configType = this.route.snapshot.paramMap.get('configType');
    if (configType) {
      this.configType = configType;
      this.activityConfigService.getById(configType).subscribe(c =>{
        console.log(c);
        this.schema = c.schema;

      });
    }
    if (id) {
      this.service.getById(id).subscribe(c =>{
        console.log(c);
        this.flowConfig = c;
        this.form.get("name")?.setValue(this.flowConfig.name);
        this.jsonEditor?.form.setValue(this.flowConfig.config);
      });
    } else {
      this.flowConfig = {name:'',id:null,configClass:configType,config:{ }};
    }
  }

  public save() {
    this.flowConfig = Object.assign({}, this.flowConfig,this.form.getRawValue());
    if(this.flowConfig){
      this.flowConfig.config = this.jsonEditor?.form.getRawValue();
      this.service.save(this.flowConfig).subscribe((c)=>{
        this.back();
      });
    }
  }

  public back(){
    this.router.navigate(['/config']).then();
  }


}
