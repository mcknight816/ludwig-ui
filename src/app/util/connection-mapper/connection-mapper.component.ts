import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Connection, Point} from "./connection.model";
import {Draggable} from "gsap/Draggable";
import {gsap} from "gsap";

@Component({
  selector: 'connection-mapper',
  templateUrl: './connection-mapper.component.html',
  styleUrls: ['./connection-mapper.component.scss']
})
export class ConnectionMapperComponent implements OnInit {
  @Input('source-selector') srcSelector: string = '';
  @Input('target-selector') tgtSelector: string = '';
  @Input('container-id') containerId: string = '';
  @Input('connections') connections: Array<Connection> | null | undefined = [];
  @Output('connection-event') connectionEvent = new EventEmitter<{ event: Event, connection: Connection }>(true);
  srcNodes: Map<string, Element> = new Map<string, Element>();
  tgtNodes: Map<string, Element> = new Map<string, Element>();

  selectedSourceNode: Element | null = null;
  handle: HTMLElement | null = null;

  constructor() {
  }

  getContainerHandleId(): string {
    return this.containerId + '-handle';
  }
  getContainerPathId(): string{
    return this.containerId + '-path';
  }
  ngOnInit(): void {
    gsap.registerPlugin(Draggable);

  }
  refresh():string {
    this.renderConnections();
    this.registerNodeEndpoints();
    return "";
  }
  registerNodeEndpoints(){
    this.srcNodes = new Map<string, Element>();
    this.tgtNodes = new Map<string, Element>();
    document.querySelectorAll(this.srcSelector).forEach(e=> {
      if(e?.id) {this.srcNodes.set(e.id,e);}
      else if(e?.parentElement?.id){this.srcNodes.set(e.parentElement.id,e);}
    });
    document.querySelectorAll(this.tgtSelector).forEach(e=> {
      if(e?.id) {this.tgtNodes.set(e.id,e);}
      else if(e?.parentElement?.id){this.tgtNodes.set(e.parentElement.id,e);}
    });
    if(!this.handle){
      this.handle = document.getElementById(this.getContainerHandleId());
    }
    Draggable.create(Array.from(this.srcNodes.values()), {
      onDragStart:(s)=> {
        if(this.handle){
          this.handle.style.display = 'block';
          this.handle.style.cursor = 'grabbing';
          this.selectedSourceNode = s.target;
        }
      },
      onDrag: (t)=>{
        gsap.set(this.selectedSourceNode,{x:0,y:0});
        if(this.handle){
          let offset:Point = this.calculateOffset();
          gsap.set(this.handle,{x:t.x + offset.x,y:t.y + offset.y});
          if(this.selectedSourceNode){
            this.renderPath(document.getElementById(this.getContainerPathId()), this.selectedSourceNode,(<Element>this.handle),'right-center','center-center');
          }
        }
      },
      onDragEnd:(s)=>{
        if(this.selectedSourceNode && this.handle){
          this.renderPath(document.getElementById(this.getContainerPathId()), this.selectedSourceNode,this.selectedSourceNode,'right-center','right-center');
          if(this.handle){
            this.handle.style.display = 'none';
            this.handle.style.cursor = 'grab';
          }
          let target:Element | null = this.findTargetNode(s.x,s.y);
          if(target && this.selectedSourceNode) {
            let srcId = this.selectedSourceNode.id ? this.selectedSourceNode.id : this.selectedSourceNode.parentElement?.id;
            let tgtId = target.id ? target.id : target.parentElement?.id;
            if(srcId && tgtId){
              this.addConnection(srcId,tgtId);
            }
          }
        }
      }
    });
  }

  addConnection(sourceId:string,targetId:string){
    let connection:Connection = {src:sourceId,tgt:targetId};
    this.connections?.push(connection);
  }

  getClosestElement(id:string): Element | null {
    let elm: Element | null = document.getElementById(id);
    if(!elm && id.lastIndexOf('[')) {
      let newId: string = id.substring(0, id.lastIndexOf('['));
      console.log('element not found for id ' + id + 'trying id ' + newId);
      return this.getClosestElement(newId);
    }
    return elm;
  }
  renderConnections(){
    this.connections?.forEach(c=>{
      this.renderConnection(c);
    });
  }
  renderConnection(connection: Connection)  {
    let pathElement: HTMLElement | null = document.getElementById(this.getConnectionId(connection));
    if ( pathElement && connection.src && connection.tgt) {
      const src:Element | null = this.getClosestElement(connection.src);
      const tgt:Element | null = this.getClosestElement(connection.tgt);
      if (src && tgt) {
        return this.renderPath(pathElement,src,tgt);
      }
    }
  }
  renderPath(path:HTMLElement | null,src:Element,tgt:Element,srcPosition:string = 'right-center',tgtPosition:string = 'left-center' ){
    path?.setAttribute("d", this.calculatePath(src,tgt,srcPosition,tgtPosition));
  }

  adjustPosition(position:string,rect:DOMRect):DOMRect{
    switch(position){
      case 'center-center':
        rect.x = rect.x + rect.width/2;
        rect.y = rect.y + rect.height/2;
        break;
      case 'right-center':
        rect.x = rect.x + rect.width;
        rect.y = rect.y + rect.height/2;
        break;
      case 'left-center':
        rect.y = rect.y + rect.height/2;
        break;
    }
    return rect;
  }
  calculatePath(src:Element,tgt:Element,srcPosition:string = 'right-center',tgtPosition:string = 'left-center' ): string {
    const offset:Point = this.calculateOffset();
    if(src && tgt) {
      let srcRect: DOMRect = this.adjustPosition(srcPosition,src.getBoundingClientRect());
      let tgtRect: DOMRect = this.adjustPosition(tgtPosition,tgt.getBoundingClientRect());
      return this.getSvgPath(srcRect.x + offset.x ,srcRect.y + offset.y ,tgtRect.x + offset.x  ,tgtRect.y + offset.y );
    } else {
      console.log("Missing path src or tgt");
    }
    return '';
  }
  getSvgPath(x1:number,y1:number,x4:number,y4:number){
    const bezierWeight: number =  -0.785;
    let dx = Math.abs(x4 - x1) *  bezierWeight;
    let x2 = x1 - dx;
    let x3 = x4 + dx;
    return `M${x1} ${y1} C ${x2} ${y1} ${x3} ${y4} ${x4} ${y4}`;
  }

  findTargetNode(x:number,y:number): Element | null {
    let elm:Element | null = null;
    this.tgtNodes.forEach((v)=>{
      let r:DOMRect = v.getBoundingClientRect();
      if( r.x <= x && x <= r.x + r.width && r.y <= y && y <= r.y + r.height){
        elm = v;
        return;
      }
    });
    return elm;
  }
  calculateOffset(): Point {
    return  ConnectionMapperComponent.getAbsoluteOffsetFromBody(document.getElementById(this.containerId));
  }
  public static getAbsoluteOffsetFromBody( el: HTMLElement | null ): Point {
    let _x = 0;
    let _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft + el.clientLeft;
      _y += el.offsetTop - el.scrollTop + el.clientTop;
      el = (<HTMLElement>el.offsetParent);
    }
    return { y: -Math.abs(_y), x: -Math.abs(_x) };
  }
  getConnectionId(connection:Connection): string {
    return connection.src + '-' + connection.tgt;
  }
  editConnection($event: MouseEvent, connection: Connection) {
    this.connectionEvent.emit({event:$event,connection:connection});
  }
}
