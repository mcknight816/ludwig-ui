import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JsonTreeEvent} from "./event.model";

@Component({
  selector: 'json-node',
  templateUrl: './json-node.component.html',
  styleUrls: ['./json-tree.component.scss']
})
export class JsonNodeComponent implements OnInit {
  @Input('key') key:any='Object';
  @Input('value') value:any;
  @Input('start-expanded') startExpanded:any = '';
  @Input() parent:JsonNodeComponent | undefined = undefined;
  @Input('key-labels') keyLabels:any;
  @Input() showPreview:boolean = false;
  @Input('node-class') nodeClass:string = 'node';
  @Output() jsonNodeEventEmitter = new EventEmitter<JsonTreeEvent>();
  isExpandable: boolean = false;
  shouldRender: boolean = false;
  preview: any;
  isExpanded: boolean = false;
  constructor(private elm: ElementRef) { }

  ngOnInit(): void {
    let type:string = this.whatClass().toLowerCase();
    this.elm.nativeElement.classList.add(type);
    if (type === 'object' || type === 'array') {
      this.isExpandable = true;
      this.elm.nativeElement.classList.add('expandable');
      if (Object.keys( this.value).length < 1) {
        this.elm.nativeElement.classList.add('empty');
      }
        let isArray:boolean = type === 'array';
        this.preview = isArray ? '[ ' : '{ ';
        this.forKeys(this.value,(v:any,k:any)=>{
          this.preview += isArray ? v + ', ' : k + ': ' + v + ', ';
        })
        this.preview = this.preview.substring(0, this.preview.length - (this.preview.length > 2 ? 2 : 0)) + (isArray ? ' ]' : ' }');

        if (this.parent &&  this.parent.startExpanded && this.parent.startExpanded === 'recursive') {
          this.startExpanded = this.parent.startExpanded;
        }
      }else{
        this.isExpandable = false;
        // Add expandable class for CSS usage
        this.elm.nativeElement.classList.add('not-expandable');
      }

  }
  getPath():string {
    let path:Array<string> = new Array<string>();
    let node: JsonNodeComponent | undefined = this;
    while(node){
      path.push('[\'' + node.key + '\']');
      node = node.parent;
    }
    path.pop();// dont count the root node
    return path.reverse().join('');
  }
 getLabel(key:string):string{
   return  this.keyLabels && this.keyLabels[key] ? this.keyLabels[key] : key;
 }
  toggleExpanded() {
      this.isExpanded = !this.isExpanded;
      if (this.isExpanded) {
        this.elm.nativeElement.classList.add('expanded');
      } else {
        this.elm.nativeElement.classList.remove('expanded');
      }
      this.shouldRender = true;
      this.jsonNodeEventEmitter.emit({name:'tree-toggle-event',data:{},id:''})
  }
  whatClass():string{
    return Object.prototype.toString.call(this.value).slice(8, -1);
  }
  forKeys(obj:any, f:any) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] !== 'function') {
        if (f(key, obj[key])) {
          break;
        }
      }
    }
  }

  handleEvent(event: JsonTreeEvent) {
    this.jsonNodeEventEmitter.emit(event);
  }
}
