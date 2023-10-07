import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {Entity, Model, ModelService} from "../model";

@Component({
  selector: 'app-model-edit',
  templateUrl: './model-edit.component.html',
  styleUrls: ['./model-edit.component.scss']
})
export class ModelEditComponent implements OnInit {
  form: FormGroup;
  item:Model;
  mode:string='edit';
  waiting: boolean = false;

  constructor(private fb: FormBuilder,private service:ModelService,private router: Router,private route: ActivatedRoute) {
    this.item = {id:null,name:'',description:'',packageName:'',createDate:null,updateDate:null,entities:[]};
    this.form = this.createForm();
  }
  ngAfterViewInit() {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.service.getById(id).subscribe((model)=>{
        this.item  = model;
        this.form = this.createForm();
      });
    }
  }

  createForm():FormGroup{
    return this.fb.group({
      id              : [this.item.id],
      name            : [this.item.name],
      packageName     : [this.item.packageName],
      description     : [this.item.description]
    });
  }

  save() {
    this.item.name = this.form.getRawValue().name;
    this.item.description = this.form.getRawValue().description;
    this.item.packageName = this.form.getRawValue().packageName;
    this.service.save(this.item).subscribe(()=>{
      this.router.navigate(['/models']);
    });
  }

  back(){
    this.router.navigate(['/models']);
  }

  updateEntities(entities: Entity[]) {
     this.item.entities = entities;
  }

  noSpaceValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
    }
    //{validators: [Validators.required,this.noSpaceValidator()]}
  }

  publish() {
    this.service.publish(this.item.id).subscribe();
  }

  downLoad(dbType:string) {
    this.waiting = true;
    this.service.downloadFile(this.item,dbType).subscribe(data =>{
        const a = document.createElement("a");
        document.body.appendChild(a);
        const blob = new Blob([data], {
          type: 'application/zip'
        });
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = this.item.name + ".zip";
        a.click();
        this.waiting = false;
        window.URL.revokeObjectURL(url);
      });
  }
}
