import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import {Flow, FlowTemplate} from "../../services/app-model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlowTemplateService} from "../../services/flow-template.service";
import {JsonEditorComponent} from "../../util/json-editor/json-editor.component";

@Component({
  selector: 'app-flow-dlg',
  templateUrl: './flow-dlg.component.html',
  styleUrls: ['./flow-dlg.component.scss']
})
export class FlowDlgComponent implements OnInit {

  form:FormGroup;
  flowTemplates: Array<FlowTemplate> = [];
  flowTemplate: FlowTemplate | null = null;
  @ViewChild(JsonEditorComponent) jsonEditor:JsonEditorComponent | undefined;
  constructor(private dialog:MatDialogRef<FlowDlgComponent>,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:Flow,private flowTemplateService: FlowTemplateService) {
    this.form = this.createForm();
  }
  ngOnInit(): void {
    this.flowTemplateService.list().subscribe(t=> {
      this.flowTemplates = t;
    })
  }
  public createForm() :FormGroup {
    return this.fb.group({
      "name": [this.data?.name],
    });
  }
  cancel() {
    this.dialog.close();
  }
  save() {
    if(this.flowTemplate) {
      this.flowTemplate.context = this.jsonEditor?.form?.getRawValue();
      this.flowTemplateService.create(this.flowTemplate).subscribe(flow=>{
        this.dialog.close( Object.assign({},flow,this.form.getRawValue()));
      });
    } else {
      this.dialog.close( Object.assign({}, this.data,this.form.getRawValue()));
    }
  }

  selectFlowTemplate($event: Event) {
    console.log($event);
  }
}
