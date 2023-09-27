import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Schema} from "../json-schema-model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'schema-form',
  templateUrl: './schema-form.component.html',
  styleUrls: ['./schema-form.component.scss']
})
export class SchemaFormComponent implements OnChanges{
  @Input() schema: Schema | undefined;
  @Input() name: string | undefined;
  @Input() form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }
  getValue(schema: Schema | undefined): any | undefined {
    if(schema){
      return schema?.value ?  schema?.value : schema['default'];
    }
    return undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  getFormGroup(key:string | undefined):FormGroup {
    if(key){
      return <FormGroup>this.form.get(key);
    }
    return this.form;
  }
}
