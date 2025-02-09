import {Component, Inject, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Knowledge} from "../knowledge.model";

@Component({
  selector: 'app-knowledge-edit',
  templateUrl: './knowledge-edit.component.html',
  styleUrls: ['./knowledge-edit.component.scss']
})
export class KnowledgeEditComponent {
  form:FormGroup;
  @ViewChild("editor") editor:any;
  text:string | undefined = "";

  constructor(private dialog:MatDialogRef<KnowledgeEditComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data:Knowledge) {
    this.form = this.createForm();
  }

  public createForm() :FormGroup {
    this.text = this.data?.text;
    return this.fb.group({
      "description": [this.data?.description],
    });
  }

  cancel() {
    this.dialog.close();
  }

  save() {
    this.data.text = this.editor.text;
    this.dialog.close( Object.assign({}, this.data,this.form.getRawValue()));
  }
}
