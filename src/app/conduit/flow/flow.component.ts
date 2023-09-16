import {AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {Connection, Flow, FlowActivity} from "../../services/app-model";
import {MatDialog} from "@angular/material/dialog";
import {ConnectionDlgComponent} from "../connection-dlg/connection-dlg.component";
import {FlowActivityDlgComponent} from "../flow-activity-dlg/flow-activity-dlg.component";
import {ConnectionMapperComponent} from "../../util/connection-mapper/connection-mapper.component";
import {CdkDragEnd} from "@angular/cdk/drag-drop";

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
  constructor(public dialog: MatDialog) {
    this.initIconMap();
  }
  ngAfterViewInit(): void {
    this.activities?.changes.subscribe( () => {
      this.connectionMapper?.refresh();
    });
  }
  showProperties($event: MouseEvent, flowActivity: FlowActivity) {
    const dialogRef = this.dialog.open(FlowActivityDlgComponent,{
        data: flowActivity ,
      height: '70%',
       width: '60%'
    });
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
        console.log(connections);
        const dialogRef = this.dialog.open(ConnectionDlgComponent, {
          panelClass: 'custom-dialog-container',
          data: {src:this.getSourceActivities($event.connection),tgt:tgtActivity,labels:this.getActivityKeyLabels(),connection:$event.connection,connections:connections},
          height: '70%',
          width: '60%'
        });
      }
    }
  }


  iconMap:any = {};
  initIconMap(){
    this.iconMap['fa-leaf'] = 'energy_savings_leaf';
  }
  lookupIcon(icon: string | null): string {
   return   icon ? this.iconMap[icon] ? this.iconMap[icon] : icon : 'Settings';
  }

  onScroll($event: Event) {
    this.connectionMapper?.refresh();
  }

  dragEnd(event: CdkDragEnd) {
    let flowActivity:FlowActivity = event.source.data;
    event.source.reset();
    flowActivity.x = event.dropPoint.x - 350;
    flowActivity.y = event.dropPoint.y - 150;

  }
}
