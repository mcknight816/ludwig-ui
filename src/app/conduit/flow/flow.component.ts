import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Connection, Flow, FlowActivity} from "../../services/app-model";

import {ConnectionDlgComponent} from "../connection-dlg/connection-dlg.component";
import {FlowActivityDlgComponent} from "../flow-activity-dlg/flow-activity-dlg.component";
import {ConnectionMapperComponent} from "../../util/connection-mapper/connection-mapper.component";
import {CdkDragEnd, Point} from "@angular/cdk/drag-drop";
import {FlowIcons} from "../flow-icons";
import {SelectContainerComponent} from "ngx-drag-to-select";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements  AfterViewInit {
  @Input() flow: Flow | null = null;
  @ViewChild('flowContainer') private flowContainer?: ElementRef<HTMLDivElement>;
  @ViewChild(ConnectionMapperComponent) connectionMapper:ConnectionMapperComponent | undefined;
  @ViewChildren('activities') activities: QueryList < any > | undefined;
  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent | undefined;

  protected readonly FlowIcons = FlowIcons;
  selectedFlowActivities:Array<FlowActivity> = [];
  disableDrag:boolean = true;
  constructor(public dialog: MatDialog) {

  }
  ngAfterViewInit(): void {
    this.activities?.changes.subscribe( () => {
      this.connectionMapper?.refresh();
    });
  }
  editFlowActivity($event: MouseEvent, flowActivity: FlowActivity) {
    const dialogRef = this.dialog.open(FlowActivityDlgComponent,{
        data: flowActivity ,
      height: '70%',
       width: '60%'
    });

    dialogRef.afterClosed().subscribe(d=>{
      console.log(d);
      if(d && d.name && d.name !== ''){
        this.updateFlowActivity(d);
      }
    })
  }
  updateFlowActivity(flowActivity:FlowActivity){
    this.flow?.activities?.forEach((a,index)=>{
      if(a.id === flowActivity.id){
        if(this.flow?.activities){
          this.flow.activities[index] = flowActivity;
        }
      }
    })
  }

  refresh():string {
    this.connectionMapper?.refresh();
    return "";
  }
  getActivityById(activityId:string):FlowActivity | null {
    let flowActivities:FlowActivity[] | undefined = this.flow?.activities?.filter(a=>{
      return a.id === activityId;
    });
    return flowActivities && flowActivities.length >0 ? flowActivities[0] : null;
  }
  getSourceActivities(connection:Connection):any{
    let srcActivities: any = {};
    if(connection.src){
      this.getSourceActivityIds(connection.src).forEach(id=>{
        let fa = this.getActivityById(id);
        if(fa){
          srcActivities[id] = {input:fa.input,output:fa.output};
        }
      })
    }
    return srcActivities;
  }
  getSourceActivityIds(src:string,activityIds:Array<any> = []):Array<string>{
    activityIds.push(src);
    this.flow?.connections?.forEach(a=>{
        if(a.tgt === src && a.src){
          this.getSourceActivityIds(a.src,activityIds);
        }
    })
    return activityIds;
  }

  getActivityKeyLabels():any{
    let keyLabels:any ={};
    this.flow?.activities?.forEach(a=>{
      if(a.id) keyLabels[a.id] = a.name;
    })
    return keyLabels;
  }
  editConnection($event: {event:Event,connection:Connection}) {
    if($event.connection.tgt){
      let tgt:FlowActivity | null = this.getActivityById($event.connection.tgt);
      let tgtActivity: any = {};
      if(tgt && tgt.id){
        tgtActivity[tgt.id] = {input:tgt.input,output:tgt.output};
        let connections:Array<Connection> = [];
        this.flow?.connectionMaps?.forEach(c =>{
              if(c.tgt?.startsWith("['" + tgt?.id + "']")){
                connections.push({src:c.src,tgt:c.tgt});
              }
        });
        const dialogRef = this.dialog.open(ConnectionDlgComponent, {
          panelClass: 'custom-dialog-container',
          data: {src:this.getSourceActivities($event.connection),tgt:tgtActivity,labels:this.getActivityKeyLabels(),connection:$event.connection,connections:connections},
          height: '70%',
          width: '60%'
        });

        dialogRef.componentInstance.onDelete.subscribe(c => {
          this.deleteConnection(c);
          dialogRef.close();
        });

      }
    }
  }

  onScroll($event: Event) {
    this.connectionMapper?.refresh();
  }

  dragEnd(event: CdkDragEnd) {
    let flowActivity:FlowActivity = event.source.data;
    let freePos:Point = event.source.getFreeDragPosition();

    if(this.selectedFlowActivities.length > 0){
      this.selectedFlowActivities.forEach(f=>{
        if(f.x && f.y){
          f.x += freePos.x;
          f.y += freePos.y;
        }
      })
    } else {
      if(flowActivity.x && flowActivity.y){
        flowActivity.x += freePos.x;
        flowActivity.y += freePos.y;
      }
    }
    event.source.reset();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if(event.key === "Delete"){
      this.deleteSelectedFlowActivities();
    }
  }
  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {

  }
  deleteSelectedFlowActivities(){
    this.selectedFlowActivities.forEach(s=>{
      this.deleteFlowActivity(s);
    })
  }
  deleteFlowActivity(activity:FlowActivity){
    this.flow?.connections?.forEach(c=>{
      if(c.tgt === activity.id || c.src === activity.id){
        this.deleteConnection(c);
      }
    });

    const index = this.flow?.activities?.indexOf(activity, 0);
    if (index != undefined && index > -1 ) {
      console.log(activity);
      console.log(index);
      this.flow?.activities?.splice(index, 1);
    }
  }

  deleteConnection(connection:Connection){
    const index = this.flow?.connections?.indexOf(connection, 0);
    if (index != undefined && index > -1) {
      this.flow?.connections?.splice(index, 1);
    }
  }

  deleteConnectionMap(){

  }

  mouseDown(event: MouseEvent) {
    if(event.ctrlKey){
      this.selectContainer?.update();
      this.disableDrag = false;
    }
  }
  mouseUp(event: MouseEvent) {
    if(event.ctrlKey){
      this.selectContainer?.update();
      this.disableDrag = true;

    } else {
      this.selectContainer?.deselectItems(()=> true);
      this.selectContainer?.clearSelection();
      Array.from(document.getElementsByClassName('dts-range-start')).forEach(i=> i.classList.remove('dts-range-start'));
    }
  }
}
