import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../services/application.service";
import {Application} from "../services/app-model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AppEditComponent} from "./app-edit/app-edit.component";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  apps:Array<Application> = [];
  constructor(private service:ApplicationService,private router: Router,public dialog: MatDialog) {
  }
  ngOnInit(): void {
   this.refreshApps();
  }

  refreshApps(){
    this.service.list().subscribe(apps=>{
      this.apps = apps;
    });
  }

  add() {
    this.openAppDialog({id:null,name:'',description:'',path:'',flows:[]});
  }

  editFlows(app: Application) {
    let url = '/apps/' + app.id + '/flows';
    this.router.navigate([url]);
  }

  openAppDialog(app:Application){
   this.dialog.open(AppEditComponent, {
      data: app, height: '40%', width: '40%'
    }).afterClosed().subscribe(d=>{
      this.service.save(d).subscribe(a=>{
        this.refreshApps();
      });
    })
  }

  openApi(app: Application) {
    let url = '/apps/' + app.id + '/swagger';
    this.router.navigate([url]);
  }

  showRequests(app: Application) {
    let url = '/apps/' + app.id + '/requests';
    this.router.navigate([url]);
  }

  editApp(app: Application) {
    this.openAppDialog(app);
  }
}
