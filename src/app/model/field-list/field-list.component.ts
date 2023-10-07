import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';

import {MatCheckboxChange} from "@angular/material/checkbox";
import {MatTable} from "@angular/material/table";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Variable} from "../model";

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit {
  @Input()
  dataSource:Variable[] = [];
  @Input()
  types:string[] = [];

  @ViewChild('table')
  table: MatTable<any> | undefined;
  selectedField:number | null = null;
  screenHeight:number = 0;
  screenWidth:number = 0;

  displayedColumns = [
    { def: 'name', showMobile: true},
    { def: 'type', showMobile: true },
    { def: 'primary', showMobile: true},
    { def: 'list', showMobile: true },
    { def: 'notNull', showMobile: false},
    { def: 'ignore', showMobile: false },
    { def: 'actions', showMobile: true}
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event?:any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  getDisplayedColumns(): string[] {
    const isMobile = this.screenWidth < 700;
    return this.displayedColumns
      .filter(cd => !isMobile || cd.showMobile)
      .map(cd => cd.def);
  }

  editMode: boolean =false;

  constructor() { this.onResize();}

  ngOnInit(): void {
  }

  changePrimary(i: number, $event: MatCheckboxChange){
    this.dataSource[i].primary = $event.checked;
  }
  changeNotNull(i: number, $event: MatCheckboxChange){
    this.dataSource[i].notNull = $event.checked;
  }
  changeList(i: number, $event: MatCheckboxChange) {
    this.dataSource[i].list = $event.checked;
  }
  changeIgnore(i: number, $event: MatCheckboxChange) {
    this.dataSource[i].ignore = $event.checked;
  }
  toggleEditMode(){
    this.editMode ? this.editMode = false : this.editMode = true;
  }

  editField(index:number,$event:any){

    this.selectedField = index;
    $event.stopPropagation()
  }
  addField(event:any){
    let name:string = event.target.value ? event.target.value : 'Untitled' ;
    name = name.replace(/\s/g, "");
    this.dataSource.push({name:name,type:"String",list:false,notNull:false,ignore:false,primary:false,length:null})
    this.table?.renderRows();
    event.target.value ="";
  }

  delete(index:number) {
    this.dataSource.splice(index, 1);
    this.table?.renderRows();
  }

  drop(event: CdkDragDrop<Variable[]>) {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    this.table?.renderRows();
  }
}

