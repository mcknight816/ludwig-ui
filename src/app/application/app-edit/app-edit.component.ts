import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Application} from "../../services/app-model";

@Component({
  selector: 'app-app-edit',
  templateUrl: './app-edit.component.html',
  styleUrls: ['./app-edit.component.scss']
})
export class AppEditComponent implements OnInit {

  form:FormGroup;
  constructor(private dialog:MatDialogRef<AppEditComponent>,private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data:Application) {
    this.form = this.createForm();
  }
  ngOnInit(): void {
  }
  public createForm() :FormGroup {
    return this.fb.group({
      "name": [this.data?.name],
      "path": [this.data?.path],
      "description": [this.data?.description],
    });
  }
  cancel() {
    this.dialog.close();
  }
  save() {
    this.dialog.close( Object.assign({}, this.data,this.form.getRawValue()));
  }

}
