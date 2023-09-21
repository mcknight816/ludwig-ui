import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";
import {  Point} from "@angular/cdk/drag-drop";
import {FlowService} from "../services/flow.service";
import {Activity, Flow, FlowActivity} from "../services/app-model";
import {FlowComponent} from "./flow/flow.component";
import {v4 as uuidv4} from 'uuid';
import {MatDialog} from "@angular/material/dialog";
import {FlowDlgComponent} from "./flow-dlg/flow-dlg.component";

@Component({
  selector: 'app-conduit',
  templateUrl: './conduit.component.html',
  styleUrls: ['./conduit.component.scss']
})
export class ConduitComponent implements OnInit,AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(FlowComponent) flowComponentView!:FlowComponent;
  constructor(private flowService: FlowService,private observer: BreakpointObserver,private route: ActivatedRoute,public dialog: MatDialog) {

  }
  flows:Array<Flow> = [];
  selectedFlow: Flow | null = null;
  flowsExpanded:boolean = false;

  ngOnInit(): void {
    this.flowService.list().subscribe(flows => this.flows = flows);
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
  }

  toggleFlows() {
    this.flowsExpanded = !this.flowsExpanded;
  }

  showFlow(flow:any) {
    this.selectedFlow = flow;
  }
  save() {
    alert('save flow');
  }
  onScroll($event: Event) {
    //this.flowComponentView.onScroll($event);
  }
  addActivity(event: { activity: Activity; location: Point }) {
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
      height: '40%',
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(d=>{
      console.log(d);
    })
  }
  toggleLock(flow: Flow) {
    flow.locked = !flow.locked;
  }
  new() {
    this.openFlowDialog( {id:null,locked:false,name:'',activities:[],connections:[],connectionMaps:[]});
  }
}
