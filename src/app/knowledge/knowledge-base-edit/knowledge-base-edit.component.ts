import {Component, Inject, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KnowledgeBase} from "../knowledge.model";
import {FlowConfigService} from "../../config/flow-config.service";

@Component({
  selector: 'app-knowledge-base-edit',
  templateUrl: './knowledge-base-edit.component.html',
  styleUrls: ['./knowledge-base-edit.component.scss']
})
export class KnowledgeBaseEditComponent {
  form:FormGroup;
  openAiConfigs: Array<string | null> = [];
  constructor(private dialog:MatDialogRef<KnowledgeBaseEditComponent>,
              private fb: FormBuilder,
              private flowConfigService: FlowConfigService,
              @Inject(MAT_DIALOG_DATA) public data:KnowledgeBase) {

    flowConfigService.list().subscribe(flowConfigs=>{
      this.openAiConfigs = flowConfigs
        .filter(flowConfig=> flowConfig.configClass?.endsWith('OpenAiConfig'))
        .map(flowConfig => flowConfig.name) ;
    });
    this.form = this.createForm();
  }
  ngOnInit(): void {
  }
  public createForm() :FormGroup {
    return this.fb.group({
      "name": [this.data?.name],
      "description": [this.data?.description],
      "openAiConfig": [this.data?.openAiConfig]
    });
  }
  cancel() {
    this.dialog.close();
  }
  save() {
    this.dialog.close( Object.assign({}, this.data,this.form.getRawValue()));
  }
}
