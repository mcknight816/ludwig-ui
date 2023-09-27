import {Component, Input} from '@angular/core';
import {Schema} from "../json-schema-model";

@Component({
  selector: 'formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.scss']
})
export class FormatterComponent {
  @Input() schema:Schema | undefined;
  @Input() name:string | undefined;
}
