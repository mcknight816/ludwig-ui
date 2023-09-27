import {Component, Input} from '@angular/core';
import {Schema} from "../../util/json-editor/json-schema-model";

@Component({
  selector: 'role-chooser',
  templateUrl: './role-chooser.component.html',
  styleUrls: ['./role-chooser.component.scss']
})
export class RoleChooserComponent {
  @Input() schema:Schema | undefined;
  @Input() name:string | undefined;
  roles:Array<string> = ['admin','user','any'];
  getValue(schema: Schema | undefined): any | undefined {
    if(schema){
      return schema?.value ?  schema?.value : schema['default'];
    }
    return undefined;
  }
}
