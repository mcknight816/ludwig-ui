import { Component } from '@angular/core';
import {Schema} from "../util/json-editor/json-schema-model";

import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {FormBuilder} from "@angular/forms";


import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {KnowledgeBaseService} from "./knowledge-base.service";
import {KnowledgeBase} from "./knowledge.model";
import {Application} from "../services/app-model";
import {AppEditComponent} from "../application/app-edit/app-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {KnowledgeBaseEditComponent} from "./knowledge-base-edit/knowledge-base-edit.component";

@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.scss']
})
export class KnowledgeBaseComponent {
  isLargeScreen = false;
  schema: Schema | undefined;
  dataSource:Array<KnowledgeBase>  = [];
  selectedItem: KnowledgeBase | undefined;
  tableColumns = [
    'name',
    'action'
  ];
 // configTypes: Array<any> = [];
//  'configClass',
  constructor(private breakpointObserver: BreakpointObserver,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private service:KnowledgeBaseService,
              protected router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      this.isLargeScreen = result.matches; // True if the screen is medium or larger
    });
    this.search();
  }

  add(event:any) {
    this.openKnowledgeBaseDialog({id:undefined,name:'',description:'',openAiConfig:''});
  }

  editKnowledgeBase(item: KnowledgeBase) {
    this.openKnowledgeBaseDialog(item);
  }

  openKnowledgeBaseDialog(knowledgeBase:KnowledgeBase){
    this.dialog.open(KnowledgeBaseEditComponent, {
      data: knowledgeBase, height: '60%', width: '40%'
    }).afterClosed().subscribe(d=>{
      this.service.save(d).subscribe(a=>{
        //this.refreshApps();
      });
    })
  }


  public filterList(searchParam: string): void {
   // this._currentSearchValue = searchParam;
   // this._currentPage = 1;
    this.search();
  }

  search() {
    this.service.list().subscribe(a=>{
      this.dataSource = a;
    //  this._dataLength = a.length;
    })
  }



  rowClicked(event:any,row:any){
    event.stopPropagation();
    let url = '/config/edit/' + row['configClass'] + '/' +  row['id'];
    this.router.navigate([url]);
  }

  delete(element:any) {
    this.service.removeById(element.id).subscribe((t)=>{
      this.search();
    });
  }

  clone(element:any){
    this.service.getById(element.id).subscribe((t)=>{
      t.id = undefined;
      this.service.save(t).subscribe(t=>{
        this.search();
      })
    });
  }

  handlePage($event: PageEvent) {
   // this._currentPage = $event.pageIndex + 1;
   // this._pageSize = $event.pageSize;
    return this.search();
  }

  onRowClick(item: KnowledgeBase) {
    if (this.isLargeScreen && item.name) {
      this.selectedItem = item;
    //  this.activityConfigService.getById(item?.configClass).subscribe(c =>{
    //    this.schema = c.schema;
    //  });
    } else {
      //  this.router.navigate(['/config/edit/' + item.configClass, item.id]); // Navigate to edit page for smaller screens
    }
  }

  save(item: KnowledgeBase){
    if(item){
    //  item.config = this.jsonEditor?.form.getRawValue();
      this.service.save(item).subscribe((c)=>{
        item = c;
      });
    }
  }
}
