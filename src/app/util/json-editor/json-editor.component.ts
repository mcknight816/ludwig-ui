import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Schema} from "./json-schema-model";

/*
string
number
integer
object
array
boolean
null
 */


@Component({
  selector: 'json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnChanges{
  @Input() schema: Schema | undefined;
  @Input() name: string | undefined;
  @Input() data: any;

  form: FormGroup | undefined;

  constructor(private fb: FormBuilder) {
  }

  getValue(schema: Schema | undefined): any | undefined {
    if(schema){
      return schema?.value ?  schema?.value : schema['default'];
    }
    return undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
