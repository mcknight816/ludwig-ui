import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
     if(changes.schema){
       this.refreshForm();
     }
  }
  refreshForm(){
    if(this.schema) {
      this.handleSchema(this.schema, this.form, null);
      let formData: any = Object.assign({}, this.form.getRawValue());
      Object.keys(formData).forEach(key => {
        if (key === 'payload' && this.data[key] && this.data[key] instanceof Object) {
          formData[key] = JSON.stringify(this.data[key]);
        } else {
          formData[key] = this.data[key] ? this.data[key] : "";
        }
      });
      this.form.setValue(formData);
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
    if(key && form) {
      if(schema.format && schema.format === 'json' && schema.value instanceof Object ){
        form.addControl(key, new FormControl(JSON.parse(schema.value)));
      } else if(schema.format && schema.format === 'javascript') {
        form.addControl(key, new FormControl(schema.value));
      } else {
        form.addControl(key, new FormControl(schema.value));
      }
    }
  }//javascript

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
