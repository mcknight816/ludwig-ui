import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {FlowConfigService} from "./flow-config.service";
import {ActivityConfigService} from "./activity-config.service";
import {ActivityConfig, FlowConfig} from "./flow-config.model";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Schema} from "../util/json-editor/json-schema-model";
import {JsonEditorComponent} from "../util/json-editor/json-editor.component";
import {FlowIcons} from "../conduit/flow-icons";


@Component({
  selector: 'app-config',
  templateUrl: './flow-config.component.html',
  styleUrls: ['./flow-config.component.scss']
})
export class FlowConfigComponent implements OnInit {
  @ViewChild(JsonEditorComponent) jsonEditor:JsonEditorComponent | undefined;
  private _currentSearchValue:string ='';
  private _currentPage: number = 1;
  private _pageSize: number = 20;
  public _dataLength: number = 0;
  isLargeScreen = false;
  schema: Schema | undefined;
  flowConfigs:Array<FlowConfig>  = [];
  selectedItem: FlowConfig | undefined;
  tableColumns = [
    'name',
    'action'
  ];
  configTypes: Array<ActivityConfig> = [];
//  'configClass',
  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder, private flowConfigService:FlowConfigService, private activityConfigService: ActivityConfigService, protected router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      this.isLargeScreen = result.matches; // True if the screen is medium or larger
    });

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
    this.flowConfigService.list().subscribe(a=>{
      this.flowConfigs = a;
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
    this.flowConfigService.removeById(element.id).subscribe((t)=>{
      this.search();
    });
  }

  clone(element:any){
    this.flowConfigService.getById(element.id).subscribe((t)=>{
      t.id = null;
      this.flowConfigService.save(t).subscribe(t=>{
        this.search();
      })
    });
  }

  handlePage($event: PageEvent) {
    this._currentPage = $event.pageIndex + 1;
    this._pageSize = $event.pageSize;
    return this.search();
  }

  onRowClick(item: FlowConfig) {
    if (this.isLargeScreen && item.configClass) {
      this.selectedItem = item;
      this.activityConfigService.getById(item?.configClass).subscribe(c =>{
        this.schema = c.schema;
      });
    } else {
    //  this.router.navigate(['/config/edit/' + item.configClass, item.id]); // Navigate to edit page for smaller screens
    }
  }

  save(item: FlowConfig){
    if(item){
      item.config = this.jsonEditor?.form.getRawValue();
      this.flowConfigService.save(item).subscribe((c)=>{
        item = c;
      });
    }
  }

  protected readonly FlowIcons = FlowIcons;



  getFlowConfigs(configType: ActivityConfig) {
    return this.flowConfigs.filter(flowConfig => flowConfig.configClass === configType.configClass);
  }
}
