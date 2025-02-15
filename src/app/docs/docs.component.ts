import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {DocNode, DocService} from "./service/doc.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit,AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  navItems:DocNode[] = [
    {name:"Introduction", ref: 'intro'},
    {name: 'Getting Started',
      children:[
        {name: 'Quick Start', ref:'quick-start'},
        {name: 'Knowledge Base', ref:'knowledge-base'},
        {name: 'Angular CLI', ref:'angular'}
      ]
    },
    {name: 'Config', children:[
        {name: 'Mongo Connection', ref:'mongo-connection-config'},
        //  {name: 'Mail', ref:'mail'},
        //  {name: 'Active MQ', ref:'active-mq'},
        //  {name: 'Couchbase Connection', ref:'couchbase-connection'},
        {name: 'Payload Schema', ref:'payload-schema-config'},
        {name: 'Open Ai', ref:'open-ai-config'},
        {name: 'Telegram', ref:'telegram-config'}
      ]
    },
    {name: 'Application', children:[
        {name: 'Flows', ref:'flows'},
        {name: 'Swagger', ref:'swagger'},
        {name: 'Log', ref:'log'}
      ]
    },
    {name: 'Flow Activities', children:[
        {
          name: 'Input', children: [
            {name: 'Post', ref: 'http-post'},
            {name: 'Columns', ref: 'http-columns'},
            {name: 'Upload', ref: 'http-upload'},
            {name: 'GetById', ref: 'http-get-by-id'},
            {name: 'Listener', ref: 'listener'},
            {name: 'Delete', ref: 'http-delete'},
            {name: 'Get', ref: 'http-get'},
          ]
        },
        {name: 'AI', children: [
            {name: 'OpenAiText', ref: 'open-ai-text'},
          ]
        },
        {name: 'Conduit', children: [
            {name: '+1 Counter', ref: 'counter'},
            {name: 'Javascript', ref: 'javascript'},
            {name: 'Validation', ref: 'validation'},
            {name: 'Template', ref: 'template'},
            {name: 'Conduit', ref: 'conduit'},
            {name: 'Mail', ref: 'mail'},
          ]
        },
        {name: 'Couch', children: [
            {name: 'Couch Columns', ref: 'couch-columns'},
            {name: 'Couch Delete', ref: 'couch-delete'},
            {name: 'Couch Find', ref: 'couch-find'},
            {name: 'Couch Get', ref: 'couch-get'},
            {name: 'Couch Save', ref: 'couch-save'},
          ]
        },
        {name: 'Files', children: [
            {name: 'Copy File', ref: 'copy-file'}
          ]
        },
        {name: 'Mongo',children: [
            {name: 'Mongo Columns', ref: 'mongo-columns'},
            {name: 'Mongo Delete', ref: 'mongo-delete'},
            {name: 'Mongo Find', ref: 'mongo-find'},
            {name: 'Mongo Get', ref: 'mongo-get'},
            {name: 'Mongo Save', ref: 'mongo-save'},
          ]
        },
        {name: 'Output', children: [
            {name: 'Http Response', ref: 'http-response'},
            {name: 'Telegram Response', ref: 'telegram-response'},
            {name: 'Http Client', ref: 'http-client'},
            {name: 'Publisher', ref: 'publisher'},
          ]
        },
        {name: 'SQL', children: [
            {name: 'SQL', ref: 'sql'},
          ]
        },
        {name: 'Trigger', children: [
            {name: 'Hot Folder', ref: 'hot-folder'},
            {name: 'Timer Trigger', ref: 'timer-trigger'},
            {name: 'Telegram Trigger', ref: 'telegram-trigger'},
          ]
        },
      ]
    },

    {name: 'Tutorials',
      children:[
        {name: 'Example Documented Tutorial', ref: 'example-tutorial'},
      ]
    },
    {name: 'Videos',
      children:[
        {name: 'Example Video Tutorial', ref: 'example-video'},
      ]
    }];

  selectedDoc?:string;
  constructor(private observer: BreakpointObserver,public docService:DocService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let docRef = this.route.snapshot.paramMap.get('docRef');
    if(docRef){
      this.readDoc(docRef);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 700px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close().then();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open().then();
        }
      });
    });
  }

  selectDoc(doc: DocNode) {
    if(doc.ref){
      this.readDoc(doc.ref);
    }
    if(this.sidenav.mode === 'over' ){
      this.sidenav.toggle();
    }
  }

  readDoc(ref:string){
    this.docService.readDoc( ref + '.md').subscribe(d=>{
      this.selectedDoc = d;
    })
  }
}
