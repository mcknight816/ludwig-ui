import {AfterContentChecked, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {JsonTreeEvent} from "./event.model";

@Component({
  selector: 'json-tree',
  template: '<json-node [key]="rootName" [value]="json" [start-expanded]="startExpanded" [key-labels]="keyLabels" [node-class]="nodeClass" (jsonNodeEventEmitter)="handleEvent($event)" ></json-node>',
  styleUrls: ['./json-tree.component.scss']
})
export class JsonTreeComponent implements AfterContentChecked {
  @Input('json-object') json:any;
  @Input('root-name') rootName:string = 'Object';
  @Input('key-labels') keyLabels:any;
  @Input('node-class') nodeClass:string = 'node';
  @Input('start-expanded') startExpanded:string = 'recursive';
  @Output() jsonTreeEventEmitter = new EventEmitter<JsonTreeEvent>();

  childCount:number = 0;
  constructor(private elm: ElementRef ) {}

  handleEvent(event: JsonTreeEvent) {
    // this.jsonTreeEventEmitter.emit(event);
  }

  ngAfterContentChecked(): void {
    let count:number = this.elm.nativeElement.querySelectorAll('.key').length;
    if(this.childCount != count){
      this.childCount = count;
      this.jsonTreeEventEmitter.emit({name:'tree-toggle-event',data:{},id:''});
    }
  }
}
