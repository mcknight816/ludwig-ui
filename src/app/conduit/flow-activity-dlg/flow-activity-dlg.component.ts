import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlowActivity} from "../../services/app-model";
import {ActivityService} from "../../services/activity.service";
import {Schema} from "../../util/json-editor/json-schema-model";
import {JsonEditorComponent} from "../../util/json-editor/json-editor.component";
import { FormBuilder, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-flow-activity-dlg',
  templateUrl: './flow-activity-dlg.component.html',
  styleUrls: ['./flow-activity-dlg.component.scss']
})
export class FlowActivityDlgComponent implements  OnInit {
  schema : Schema | undefined;
  @ViewChild(JsonEditorComponent) jsonEditor:JsonEditorComponent | undefined;
  form:FormGroup;
  constructor(private dialog:MatDialogRef<FlowActivityDlgComponent>,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:FlowActivity,private activityService: ActivityService) {
    this.form = fb.group({
      description:[data.description]
    });
  }
  ngOnInit(): void {
    this.activityService.list().subscribe(as=>{
       as.forEach(a=>{
         if(this.data.activityClass === a.activityClass){
           this.schema = a.schema;
         }
       });
    })
  }

  cancel() {
    this.dialog.close();
  }

  save() {
    let flowActivity:FlowActivity = Object.assign({}, this.data,this.form.getRawValue());
    flowActivity.input = Object.assign({}, flowActivity.input,this.jsonEditor?.form?.getRawValue());
    if( flowActivity.input['payload']){
      try{
        flowActivity.input['payload'] = JSON.parse( flowActivity.input['payload']);
      }catch(e){
        console.log(e);
      }

    }
    this.dialog.close( flowActivity);
  }
}
