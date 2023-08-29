import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {FlowService} from "../services/flow.service";
import {Flow} from "../services/app-model";

@Component({
  selector: 'app-flow-form',
  templateUrl: './flow-form.component.html',
  styleUrls: ['./flow-form.component.scss']
})
export class FlowFormComponent implements OnInit {
  item:Flow;
  form:FormGroup;

  constructor(private fb: FormBuilder,private service:FlowService,private router: Router,private route: ActivatedRoute) {
    this.item = this.emptyItem();
    this.form = this.createForm();
  }

  ngOnInit(): void {
     let id = this.route.snapshot.paramMap.get('id');
     if(id){
         this.service.getById(id).subscribe(i=>{
             this.item = i;
             this.form = this.createForm();
         });
     }
  }

  public save() {
    this.service.save(Object.assign({}, this.item,this.form.getRawValue())).subscribe(()=>{
        this.back();
    });
  }

  public back(){
     this.router.navigate(['/flows']).then();
  }

  public emptyItem():Flow{
    return {
			id:null,
			name:'',
		};
  }

  public createForm():FormGroup{
     return this.fb.group({
        "name": [this.item.name],
     });
  }
}
