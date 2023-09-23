import { Component, OnInit } from '@angular/core';
import {ApplicationService} from "../services/application.service";
import {Application, Flow} from "../services/app-model";
import {Router} from "@angular/router";
import {FlowDlgComponent} from "../conduit/flow-dlg/flow-dlg.component";
import {MatDialog} from "@angular/material/dialog";

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
    this.openAppDialog({id:null,name:'',description:'',flows:[]});
  }

  editFlows(app: Application) {
    let url = '/app/' + app.id + '/flows';
    this.router.navigate([url]);
  }

  openAppDialog(app:Application){
   this.dialog.open(FlowDlgComponent, {
      data: app, height: '40%', width: '40%'
    }).afterClosed().subscribe(d=>{
      this.service.save(d).subscribe(a=>{
        this.refreshApps();
      });
    })
  }

}
