import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Activity, FlowActivity} from "../../services/app-model";
import {ActivityService} from "../../services/activity.service";
import {Schema} from "../../util/json-editor/json-schema-model";
import {JsonEditorComponent} from "../../util/json-editor/json-editor.component";


@Component({
  selector: 'app-flow-activity-dlg',
  templateUrl: './flow-activity-dlg.component.html',
  styleUrls: ['./flow-activity-dlg.component.scss']
})
export class FlowActivityDlgComponent implements OnInit {
  schema : Schema | undefined;
  @ViewChild(JsonEditorComponent) jsonEditor:JsonEditorComponent | undefined;
  activities: Map<string,Activity> = new Map<string,Activity>();
  constructor(@Inject(MAT_DIALOG_DATA) public data:FlowActivity,private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activityService.list().subscribe(as=>{
       as.forEach(a=>{
         if(this.data.activityClass === a.activityClass){
           this.schema = a.schema;
         }
         //this.activities.set(a.activityClass,a);
       })
    })
  }


}
