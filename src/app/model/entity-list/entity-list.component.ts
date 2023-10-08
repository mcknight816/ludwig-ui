import {Component, Input, OnInit} from '@angular/core';
import {Entity, Variable} from "../model";

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {
  @Input() entities:Array<Entity>   = new Array<Entity>();

  importMode:boolean = false;
  selectedEntity:number | null = null;
  editMode: boolean =false;

  constructor() {}

  types():Array<string>{
    let types =  new Array<string>();
    types.push("String");
    types.push("BigDecimal");
    types.push("Integer");
    types.push("Long");
    types.push("Double");
    types.push("Boolean");
    types.push("Instant");
    types.push("Date");
    this.entities.forEach((entity:Entity)=>{
      types.push(entity.name);
    })
    return types;
  }

  toggleEditMode(){
    this.editMode ? this.editMode = false : this.editMode = true;
  }

  ngOnChanges() {

  }

  editEntity(index:number,$event:any){
    this.selectedEntity = index;
    $event.stopPropagation()
  }


  ngOnInit(): void {

  }

  addEntity(target: HTMLInputElement){
    let name:string =  target.value ?  target.value : 'Untitled' ;
    name = name.replace(/\s/g, "");
    name = name.charAt(0).toUpperCase() + name.substr(1);
    let entity:Entity =  {name:name,variables:new Array<Variable>()}
    this.entities.push(entity);
    target.value ="";
  }

  variablesValue(i: number):Variable[] {
    if(!this.entities[i].variables){
      this.entities[i].variables = new Array<Variable>();
    }
    return this.entities[i].variables;
  }

  import() {
    this.importMode = true;
  }

  export() {
    alert("output component goes here");
  }

  removeEntity(i: number) {
    this.entities.splice(i, 1);
  }

  merge(entities: Entity[]) {
    entities.forEach((entity => this.entities.push(entity)));
    this.importMode = false;
  }

  private static hasWhiteSpace(value: any):boolean {
    return /\s/g.test(value);
  }
}
