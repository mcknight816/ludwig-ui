import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


import {SelectionModel} from "@angular/cdk/collections";
import {Entity, Model, ModelService} from "../model";


@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  user:any={};
  selection = new SelectionModel<Model>(true, []);
  dataSource:Model[]  = [];
  @Input() importMode:boolean = false;
  @Output() onImport = new EventEmitter<Entity[]>();

  private _currentSearchValue:string ='';
  private _currentPage: number = 1;
  count:number = 0;
  size:number = 1;
  tableColumns = [
    { def: 'select', showMobile: true,showUser:true },
    { def: 'name', showMobile: true,showUser:true  },
    { def: 'owner', showMobile: true,showUser:false  },
    { def: 'description', showMobile: false,showUser:true  },
    { def: 'entities', showMobile: true,showUser:true  },
    { def: 'createDate', showMobile: false,showUser:true  },
    { def: 'updateDate', showMobile: false,showUser:true  },
    { def: 'action', showMobile: true,showUser:true  }
   ];
  screenHeight:number = 0;
  screenWidth:number = 0;

  constructor(private router: Router,private service:ModelService,private route: ActivatedRoute) {
    this.onResize();
    this.search();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?:any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  public filterList(searchParam: string): void {
    this._currentSearchValue = searchParam;
    this._currentPage = 1;
    this.search();
  }

  search() {
    this.service.search(this._currentSearchValue,this._currentPage -1).subscribe((p)=>{
      this.dataSource = p;
    })
  }

  getDisplayedColumns(): string[] {
    const isMobile = this.screenWidth < 700;
    return this.tableColumns
      .filter(cd => !isMobile || cd.showMobile)
      .filter(cd => this.isAdmin() || cd.showUser)
      .map(cd => cd.def);
  }

  isAdmin():boolean{
    return this.user['login'] === 'bluntsoftware';
  }

  ngOnInit(): void {
    let search = this.route.snapshot.paramMap.get('search');

    if(search){
      this._currentSearchValue = search;
    }
/*
    this.userService.getUserInfo().subscribe(u=>{
      this.user = u;
      this.search();
    }); */
  }

  rowClicked(row:Model){
    if(this.importMode){
      this.checkboxLabel(row);
    }else{
      let url = '/models/model/' + row['id'];
      this.router.navigate([url]);
    }

  }

  add(){
    this.router.navigate(['/models/model']);
  }

  removeSelected(){
    if(!this.importMode){
      this.selection.selected.forEach(m=>{
        this.service.removeById(m.id).subscribe((t)=>{
          this.selection.clear();
          this.search();
        });
      })
    }
  }

  importSelected(){
    if(this.importMode){
      this.selection.selected.forEach(m=>{
        this.onImport.emit( m.entities);
      })
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Model): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  clone(element : any) {
    this.service.getById(element.id).subscribe((t)=>{
      t.id = null;
      t.name = t.name + "_copy"
      this.service.save(t).subscribe(t=>{
        this.search();
      })
    });
  }

  delete(element : any) {
    this.service.removeById(element.id).subscribe((t)=>{
      this.selection.clear();
      this.search();
    });
  }

  export(element : any) {
    this.service.export(element.id).subscribe(data =>{
      const a = document.createElement("a");
      document.body.appendChild(a);
      const blob = new Blob([data], {type: 'application/json'});
      a.href = window.URL.createObjectURL(blob);
      a.download = element.name + ".json";
      a.click();
      window.URL.revokeObjectURL( a.href );
    });
  }

  import() {
    this.router.navigate(['/import/model']);
  }


}
