import {Component, HostListener, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Knowledge, KnowledgeBase} from "../knowledge.model";

import {MatDialog} from "@angular/material/dialog";
import {KnowledgeBaseService} from "../knowledge-base.service";
import {KnowledgeEditComponent} from "../knowledge-edit/knowledge-edit.component";
import {KnowledgeService} from "../knowledge-service";
import {FlowConfigService} from "../../config/flow-config.service";


@Component({
  selector: 'app-knowledge-list',
  templateUrl: './knowledge-list.component.html',
  styleUrls: ['./knowledge-list.component.scss']
})
export class KnowledgeListComponent implements OnChanges {

  @Input() knowledgeBase: KnowledgeBase | undefined;
  dataSource: Knowledge[]  = [];

  tableColumns = [
    { def: 'description', showMobile: true,showUser:true  },
    { def: 'text', showMobile: true,showUser:true  },
    { def: 'processed', showMobile: true,showUser:true  },
    { def: 'action', showMobile: true,showUser:true  },
  ];

  screenHeight:number = 0;
  screenWidth:number = 0;

  constructor( public dialog: MatDialog,
               private service:KnowledgeBaseService,
               private knowledgeService: KnowledgeService) {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event?:any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  getDisplayedColumns(): string[] {
    const isMobile = this.screenWidth < 700;
    return this.tableColumns
      .filter(cd => !isMobile || cd.showMobile)
      .map(cd => cd.def);
  }

  add() {
    this.openKnowledgeDialog({id:undefined,baseId:this.knowledgeBase?.id,text:'',processed:false,description:''});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['knowledgeBase']) {
       this.search();
    }
  }

  search() {
    this.knowledgeService.search(this.knowledgeBase?.id).subscribe((p)=>{
      this.dataSource = p;
    })
  }

  editKnowledgeBase(item: Knowledge) {
    this.openKnowledgeDialog(item);
  }

  openKnowledgeDialog(knowledgeBase:Knowledge){
    this.dialog.open(KnowledgeEditComponent, {
      data: knowledgeBase, height: '80%', width: '90%'
    }).afterClosed().subscribe(d=>{
      this.knowledgeService.save(d).subscribe(a=>{
         this.search();
      });
    })
  }

  rowClicked(knowledge: Knowledge) {
      this.editKnowledgeBase(knowledge);
  }

  clone(knowledge: Knowledge) {

  }
  delete(knowledge: Knowledge) {

  }


}
