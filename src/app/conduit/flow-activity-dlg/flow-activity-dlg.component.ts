import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-flow-activity-dlg',
  templateUrl: './flow-activity-dlg.component.html',
  styleUrls: ['./flow-activity-dlg.component.scss']
})
export class FlowActivityDlgComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

}
