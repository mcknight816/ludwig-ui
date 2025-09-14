import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {IconService} from "../services/icon.service";
import {MatDialog} from "@angular/material/dialog";
import {KnowledgeBase} from "../knowledge/knowledge.model";
import {Application} from "../services/app-model";
import {KnowledgeBaseService} from "../knowledge/knowledge-base.service";
import {ApplicationService} from "../services/application.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  applications: Array<Application> = [];
  knowledgeBases: Array<KnowledgeBase> = [];
  selectedApplications: Array<Application> = [];
  selectedKnowledgeBases: Array<KnowledgeBase> = [];

  user:any = {};
  constructor(private applicationService: ApplicationService, private knowledgeBaseService: KnowledgeBaseService, private iconService: IconService,private  dialog:  MatDialog,private router: Router,private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.iconService.registerIcons();
    this.applicationService.list().subscribe(apps=> this.applications = apps)
    this.knowledgeBaseService.list().subscribe(kbs=> this.knowledgeBases = kbs);
  }

  example(){
    const src: Array<{code:string}> = [{code:'a'},{code:'b'},{code:'c'},{code:'d'}];
    const tgt: Array<{code:string,val:number | null}> = [{code:'a',val:32},{code:'b',val:25},{code:'g',val:45},{code:'f',val:21}];
    console.log(this.matchSrcByCode(src,tgt));
  }

  matchSrcByCode<T extends {code: string}>( src: Array<T>, tgt: Array<T>): Array<T> {
    const newTgt : Array<T> = tgt.filter(t => tgt.filter(t=> src.findIndex(s => s.code === t.code) < 0)
      .findIndex(s => s.code === t.code) < 0);
    src.filter(t=> tgt.findIndex(s => s.code === t.code) < 0).forEach(a=> newTgt.push(a));
    return newTgt;
  }
  onApplicationsChange(values: Array<Application>) {
    this.selectedApplications = values || [];
    // handle application selection change as needed
  }

  onKnowledgeBasesChange(values: Array<KnowledgeBase>) {
    this.selectedKnowledgeBases = values || [];
    // handle knowledge base selection change as needed
  }

}
