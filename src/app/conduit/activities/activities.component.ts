import {Component, Input, OnInit} from '@angular/core';
import {CdkDragMove} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  constructor() { }
  types:any[] = [{text:"Activity"}]
  ngOnInit(): void {
  }
  moved($event: CdkDragMove<any>) {

  }
}
