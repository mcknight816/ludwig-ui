import {Component, Input, OnInit, Output, EventEmitter, HostBinding} from '@angular/core';
import {DocNode} from "../service/doc.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'doc-item',
  templateUrl: './doc-item.component.html',
  styleUrls: ['./doc-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(90deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class DocItemComponent implements OnInit {
  expanded: boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item?: DocNode;
  @Input() depth: number = 0;
  @Output() selectNodeEvent = new EventEmitter<DocNode>();

  constructor(public router: Router) {}

  ngOnInit(): void {}

  onItemSelected(item: DocNode) {

    if(item.ref){
      this.selectNodeEvent.emit(item);
      this.router.navigate(['docs/' +item.ref]);
    }

    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  isActive(ref: string) {
    return this.router.isActive('docs/' + ref, true);
  }
}
