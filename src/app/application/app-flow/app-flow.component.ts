import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApplicationService} from "../../services/application.service";
import {Application, Flow} from "../../services/app-model";


@Component({
  selector: 'app-app-flow',
  templateUrl: './app-flow.component.html',
  styleUrls: ['./app-flow.component.scss']
})
export class AppFlowComponent implements OnInit {

  app: Application | undefined;
  flows: Array<Flow> = [];
  constructor(private applicationService: ApplicationService, private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('appId');
    if(id){
      this.applicationService.getById(id).subscribe(i=>{
        this.app = i;
        this.flows = this.app.flows ? this.app.flows : [];
      });
    }
  }
  public back(){
    this.router.navigate(['/apps']).then();
  }

  save(flows: Array<Flow>) {
    if(this.app){
      this.app.flows = flows;
      this.applicationService.save(this.app).subscribe(a =>{
        console.log(a);
        this.back();
      });
    }
  }
}
