import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {Flow} from "../../services/app-model";
import {FormBuilder, FormGroup} from "@angular/forms";

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

    this.dialog.close(this.form.getRawValue());
  }
}
