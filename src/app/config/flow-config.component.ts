import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {FlowConfigService} from "./flow-config.service";
import {ActivityConfigService} from "./activity-config.service";
import {FlowConfig} from "./flow-config.model";

@Component({
  selector: 'app-config',
  templateUrl: './flow-config.component.html',
  styleUrls: ['./flow-config.component.scss']
})
export class FlowConfigComponent {
  private _currentSearchValue:string ='';
  private _currentPage: number = 1;
  private _pageSize: number = 20;
  public _dataLength: number = 0;

  dataSource:Array<FlowConfig>  = [];

  tableColumns = [
    'id',
    'name',
    'configClass',
    'action'
  ];
  configTypes: Array<any> = [];

  constructor(private fb: FormBuilder, private service:FlowConfigService, private activityConfigService: ActivityConfigService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activityConfigService.list().subscribe(c=>{
      this.configTypes = c;
    })
    this.search();
  }

  public filterList(searchParam: string): void {
    this._currentSearchValue = searchParam;
    this._currentPage = 1;
    this.search();
  }

  search() {
    this.service.list().subscribe(a=>{
      this.dataSource = a;
      this._dataLength = a.length;
    })
  }

  add(configType:any){
    this.router.navigate(['/config/edit/' + configType.configClass]);
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
      t.id = null;
      this.service.save(t).subscribe(t=>{
        this.search();
      })
    });
  }

  handlePage($event: PageEvent) {
    this._currentPage = $event.pageIndex + 1;
    this._pageSize = $event.pageSize;
    return this.search();
  }
}
