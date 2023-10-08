import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Entity, ModelService} from "../model";

@Component({
  selector: 'app-model-import',
  templateUrl: './model-import.component.html',
  styleUrls: ['./model-import.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModelImportComponent implements OnInit {
  @ViewChild("editor") editor:any;
  @ViewChild("yamleditor") yamlEditor:any;

  @Output() onChange = new EventEmitter<Entity[]>();
  yaml:string = "";
  json:string = "{}";
  name:string = "Untitled";
  aiDescription:string | undefined;
  aiRunning : boolean = false;
  constructor(private service:ModelService) { }
  ngOnInit(): void {
  }

  back() {
    this.onChange.emit(new Array<Entity>());
  }

  importModel(entities:Entity[]){
    this.onChange.emit(entities);
  }

  import() {
    this.unFormatJson();
    this.service.import(this.name,this.json).subscribe(entities=>{
      this.onChange.emit(entities);
    })
  }
  removeCrLfTab(text:string){
    return text.replace(/[\n\r\t]/g, "");
  }

  beautifyJson(json:string){
    return JSON.stringify(JSON.parse(json),null,'\t');
  }

  formatJson(){
    this.json = this.beautifyJson(this.editor.value);
  }

  createModelViaAI(){
    this.aiRunning = true;
    this.service.generateAIModelJson(this.aiDescription).subscribe(mj=>{
      this.json =  this.beautifyJson(JSON.stringify(mj.json));
      this.name = mj.modelType;
      this.aiRunning = false;
    });
  }

  unFormatJson(){
    this.json = this.removeCrLfTab(this.editor.value);
  }

  importYaml() {
    this.service.importYaml(this.yamlEditor.value).subscribe(entities=>{
      this.onChange.emit(entities);
    })
  }
}
