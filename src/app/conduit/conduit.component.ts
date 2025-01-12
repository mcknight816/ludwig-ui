import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";
import {  Point} from "@angular/cdk/drag-drop";
import {Activity, Flow, FlowActivity} from "../services/app-model";
import {FlowComponent} from "./flow/flow.component";
import {v4 as uuidv4} from 'uuid';

import {FlowDlgComponent} from "./flow-dlg/flow-dlg.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-conduit',
  templateUrl: './conduit.component.html',
  styleUrls: ['./conduit.component.scss']
})
export class ConduitComponent implements OnInit,AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(FlowComponent) flowComponentView!:FlowComponent;
  @Input() flows: Array<Flow> | undefined = [];
  @Input() category: string | undefined;
  @Output() saveFlows:EventEmitter<Array<Flow>> = new EventEmitter<Array<Flow>>(true);
  selectedFlow: Flow | null = null;
  flowsExpanded:boolean = false;
  constructor(private observer: BreakpointObserver,private route: ActivatedRoute,public dialog: MatDialog) {

  }
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 700px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close().then();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open().then();
        }
      });
    });
    if(!this.selectedFlow && this.flows && this.flows.length > 0){
      this.selectedFlow = this.flows[0];
    }
  }

  toggleFlows() {
    this.flowsExpanded = !this.flowsExpanded;
  }

  showFlow(flow:Flow) {
    this.selectedFlow = flow;
  }
  save() {
    this.saveFlows.emit(this.flows);
  }
  onScroll($event: Event) {
    //this.flowComponentView.onScroll($event);
  }
  addActivity(event: { activity: Activity; location: Point }) {

    const point:Point = {x:event.location.x -350,y:event.location.y -150};
    let connectionId = this.flowComponentView?.connectionMapper?.findClosestConnection(point);
    let flowActivity:FlowActivity = {...event.activity,...{
        id:uuidv4(),
        x:event.location.x -350,//todo: get offset
        y:event.location.y -150,//todo: get offset
        description:'',
        context:'',
        hasError:false}
    };
    this.selectedFlow?.activities?.push(flowActivity);
    this.flowComponentView.flow = this.selectedFlow;
  }
  openFlowDialog(flow:Flow){
    const dialogRef = this.dialog.open(FlowDlgComponent, {
      panelClass: 'custom-dialog-container',
      data: flow,
      height: '70%',
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(d=>{
      if(d && d.name && d.name !== ''){
        if (!d.id) { // add
          d.id = uuidv4();
        } else { // edit
           this.delete(flow);
        }
        this.flows?.push(d);
        this.selectedFlow = d;
      }
    });
  }
  toggleLock(flow: Flow) {
    flow.locked = !flow.locked;
  }
  new() {
    this.openFlowDialog( {id:null,locked:false,name:'',activities:[],connections:[],connectionMaps:[]});
  }

  cancel() {
    this.saveFlows.emit(undefined);
  }

  clone(flow: Flow) {
    this.flows?.push(Object.assign({},flow,{id:uuidv4(),name:flow.name + ' clone'}));
  }

  delete(flow: Flow) {
    this.flows = this.flows?.filter(f=> f.id !== flow.id);
  }
}
