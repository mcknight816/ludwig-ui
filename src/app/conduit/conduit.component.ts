import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";
import {CdkDragDrop, CdkDragMove} from "@angular/cdk/drag-drop";
import {FlowService} from "../services/flow.service";
import {Flow} from "../services/app-model";
import {FlowComponent} from "./flow/flow.component";

@Component({
  selector: 'app-conduit',
  templateUrl: './conduit.component.html',
  styleUrls: ['./conduit.component.scss']
})
export class ConduitComponent implements OnInit,AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(FlowComponent) flowComponentView!:FlowComponent;
  constructor(private flowService: FlowService,private observer: BreakpointObserver,private route: ActivatedRoute) {

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

  itemDropped($event: CdkDragDrop<any, any>) {
    alert("dropped");
  }

  save() {
    alert('save flow');
  }

  onScroll($event: Event) {
    //this.flowComponentView.onScroll($event);
  }
}
