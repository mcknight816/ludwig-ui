import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlowConfigService} from "../flow-config.service";
import {Schema} from "../../util/json-editor/json-schema-model";
import {ActivityConfigService} from "../activity-config.service";
import {FlowConfig} from "../flow-config.model";

@Component({
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.scss']
})
export class ConfigEditComponent {
  @Input() flowConfig: FlowConfig | undefined;
  @Input() schema: Schema | undefined;
  constructor(private service:FlowConfigService, private activityConfigService: ActivityConfigService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('configId');
    let configType = this.route.snapshot.paramMap.get('configType');
    if(id){
      this.service.getById(id).subscribe(c =>{
        this.flowConfig = c;
        this.schema = c.config.schema;
      });
    }
    if(configType){
      this.activityConfigService.getById(configType).subscribe(c =>{
        this.schema = c.schema;
      });
    }
  }

  public save() {
    this.service.save(this.flowConfig).subscribe(()=>{
      this.back();
    });
  }

  public back(){
    this.router.navigate(['/config']).then();
  }
}
