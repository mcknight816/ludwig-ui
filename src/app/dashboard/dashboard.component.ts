import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {IconService} from "../services/icon.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user:any = {};
  constructor(private iconService: IconService,private  dialog:  MatDialog,private router: Router,private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.iconService.registerIcons();
  }
}
