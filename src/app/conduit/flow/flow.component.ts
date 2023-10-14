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
import {Connection, ConnectionMap, ConnectionPath, Flow, FlowActivity} from "../../services/app-model";

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
    this.connectionMapper?.renderConnections();
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
      this.getSourceActivityIds(connection.src).reverse().forEach(id=>{
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
          height: '80%',
          width: '60%'
        });

        dialogRef.componentInstance.eventDelete.subscribe(c => {
          this.deleteConnection(c);
          dialogRef.close();
        });
        dialogRef.componentInstance.eventSave.subscribe(c => {
            let connectionMaps:Array<ConnectionMap> = c.map( c => {
              return {  src: c.src,
                tgt: c.tgt,
                targetPath: null,
                sourcePath: null };
            });
          if(this.flow?.connectionMaps){
            this.flow.connectionMaps = [...connectionMaps,...this.flow.connectionMaps];
          } else if(this.flow){
            this.flow.connectionMaps =  connectionMaps;
          }
          dialogRef.close();
        });
      }
    }
  }

  onScroll($event: any) {
  //  this.connectionMapper?.renderConnections();
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

    if (this.flow?.activities) {
      this.flow.activities = this.flow.activities.filter(a => activity.id !== a.id);
    }
  }

  deleteConnection(con:Connection){
    if (this?.flow?.connections) {
      this.deleteConnectionMaps(con);
      this.flow.connections = this.flow?.connections.filter(c => c.src !== con.src && c.tgt !== con.tgt);
    }
    this.connectionMapper?.refresh();
  }

  deleteConnectionMaps(con:Connection){
    if (this.flow?.connectionMaps){
      this.flow.connectionMaps = this.flow?.connectionMaps?.filter(cm => {
        !cm?.tgt?.startsWith("['" + con.tgt + "']");
      });
    }
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
