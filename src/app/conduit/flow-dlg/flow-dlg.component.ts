import {Component, Inject, OnInit} from '@angular/core';

import {Flow} from "../../services/app-model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-flow-dlg',
  templateUrl: './flow-dlg.component.html',
  styleUrls: ['./flow-dlg.component.scss']
})
export class FlowDlgComponent implements OnInit {

  form:FormGroup;
  constructor(private dialog:MatDialogRef<FlowDlgComponent>,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:Flow) {
    this.form = this.createForm();
  }
  ngOnInit(): void {
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
    this.dialog.close( Object.assign({}, this.data,this.form.getRawValue()));
  }
}
