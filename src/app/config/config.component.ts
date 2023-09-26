import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {ConfigService} from "./config.service";
import {ActivityConfigService} from "./activity-config.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
  private _currentSearchValue:string ='';
  private _currentPage: number = 1;
  private _pageSize: number = 20;
  public _dataLength: number = 0;

  dataSource:any[]  = [];

  tableColumns = [
    'id',
    'name',
    'action'
  ];
  configTypes: Array<any> = [];

  constructor(private fb: FormBuilder,private service:ConfigService,private activityConfigService: ActivityConfigService,private router: Router,private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activityConfigService.list().subscribe(c=>{
      this.configTypes = c;
      console.log(c);
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

  rowClicked(row:any){
    let url = '/config/' + row['id'];
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
