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
        {name: 'Angular CLI', ref:'angular'}
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
