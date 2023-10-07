import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  ViewChild,
} from '@angular/core';

import {ConnectionMapperComponent} from "../../util/connection-mapper/connection-mapper.component";
import {JsonTreeEvent} from "../../util/json-tree/event.model";
import {Connection} from "../../util/connection-mapper/connection.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-connection-dlg',
  templateUrl: './connection-dlg.component.html',
  styleUrls: ['./connection-dlg.component.scss'],
})
export class ConnectionDlgComponent implements AfterViewInit{
  @ViewChild(ConnectionMapperComponent) connectionMapper:ConnectionMapperComponent | null = null;
  eventDelete = new EventEmitter(true);
  eventSave = new EventEmitter<Array<Connection>>(true);
  constructor(@Inject(MAT_DIALOG_DATA) public data:{src:any,tgt:any,labels:any,connection:Connection,connections:Array<Connection>}) {

  }
  ngAfterViewInit(): void {
    if(this.connectionMapper){
       //this.connectionMapper.refresh();
    }
  }
  delete() {
    this.eventDelete.emit(this.data.connection);
  }

  save() {
    this.eventSave.emit(this.data.connections);
  }
  protected readonly close = close;
  handelEvent(event: JsonTreeEvent) {
    switch(event.name){
      case 'tree-toggle-event': this.connectionMapper?.refresh(); break;
    }
  }
  onScroll($event: Event) {
    console.log('scrolling');
    this.connectionMapper?.refresh();
  }



}
