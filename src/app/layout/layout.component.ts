import { Component, OnInit } from '@angular/core';
import {Layout} from "./layout.types";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  layout:Layout = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}
