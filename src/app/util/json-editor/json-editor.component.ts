import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Schema} from "./json-schema-model";

@Component({
  selector: 'json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnChanges{
  @Input() schema: Schema | undefined;
  @Input() data: any;
  @Input() form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm(this.schema);
  }
  private createForm(schema: Schema | undefined) {
    return this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.form){
      this.form = this.fb.group({});
      this.form.setValue(this.data);
    }

    if(this.schema){
      this.handleSchema(this.schema,this.form,null);
    }
  }

  handleSchema(schema:Schema,form:FormGroup,key: string | null){
    switch(schema?.type){
      case 'object': this.handleObject(schema,form,key); break;
      case 'string': this.handleString(schema,form,key); break;
      case 'number': this.handleNumber(schema,form,key); break;
      case 'integer': this.handleInteger(schema,form,key); break;
      case 'array': this.handleArray(schema,form,key); break;
      case 'boolean': this.handleBoolean(schema,form,key); break;
      case 'null': this.handleNull(schema,form,key); break;
    }
  }

  handleObject(schema:Schema,form:FormGroup,key:string | null){
    if(schema?.properties){
      Object.keys(schema?.properties).forEach(k =>{
        if(schema?.properties){
          if(key){
            form.addControl(key,this.fb.group({}),{});
          }
          let sch:Schema = schema?.properties[k];
          this.handleSchema(sch,key ? <FormGroup>form.get(key) : form,k);
        }
      });
    }
  }
  private handleString(schema:Schema,form:FormGroup,key:string | null) {
    if(key &&  form) {
      form.addControl(key, new FormControl(schema.value, Validators.required));
    }
  }

  private handleNumber(schema:Schema,form:FormGroup, key:string | null) {
    console.log('number not handled ' + key);
  }

  private handleInteger(schema:Schema,form:FormGroup, key:string | null) {
    console.log('integer not handled ' + key);
  }

  private handleArray(schema:Schema,form:FormGroup, key:string | null) {
    console.log('array not handled ' + key);
  }
  private handleBoolean(schema:Schema,form:FormGroup, key:string | null) {
    console.log('boolean not handled ' + key);
  }
  private handleNull(schema:Schema,form:FormGroup, key:string | null) {
    console.log('null not handled ' + key);
  }

}
