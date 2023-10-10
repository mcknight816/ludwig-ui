import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Config} from "../services/config";

export interface Model{
  id: string | null;
  name: string;
  packageName: string;
  description:string | null;
  createDate:any  | null;
  updateDate:any  | null;
  entities: Array<Entity>;
}

export interface ModelJson {
  json:any;
  modelType:string;
}

export interface Entity{
  name:string;
  variables: Array<Variable>;
}

export interface Variable{
  name:string;
  type:string;
  list:boolean;
  primary:boolean;
  ignore:boolean;
  notNull:boolean;
  length:number | null;
}

@Injectable()
export class ModelService {
  constructor(public http: HttpClient,public config:Config ) { }

  search(modelId:string = '',page:number = 0,limit:number = 50):Observable<Array<Model>> {
    let url:string = this.config.api + "/core/model/search";
    const params = new HttpParams().set('page', String(page)).set('limit', String(limit));
    return this.http.get<Array<Model>>(modelId !== '' ? url + "/" + modelId :url, {params});
  }

  findAllByName(name:string = '' ):Observable<Array<Model>> {
    let url:string = this.config.api + "/core/model/findAllByName";
    return this.http.get<Array<Model>>(name !== '' ? url + "/" + name :url);
  }

  save(model: Model):Observable<Model>{
    return this.http.post<Model>(this.config.api + "/core/model", model);
  }

  getById(id: string):Observable<Model> {
    return this.http.get<Model>(this.config.api + "/core/model/" + id);
  }

  removeById(id: string | null):Observable<any>{
    console.log("Remove id " + id);
    return this.http.delete<any>(this.config.api + "/core/model/" + id);
  }

  import(name:string | null,json:string){
    return this.http.post<Entity[]>(this.config.api + "/core/model/import", JSON.parse(json), {
      params:new HttpParams().set('name', name ? name : "Untitled")
    });
  }

  importYaml(yaml:string) {
    return this.http.post<Entity[]>(this.config.api + "/core/model/import-yaml",{'yaml':yaml});
  }

  publish(id: string | null):Observable<Model> {
    return this.http.post<Model>(this.config.api + "/core/model/publish/" + id,{});
  }

  downloadFile(model: Model,dbType: string) {
    return this.http.post(this.config.api + "/core/model/download/" + dbType,model, {
      responseType: 'arraybuffer'
    });
  }

  export(id : string) {
    return this.http.get(this.config.api + "/core/model/export/" + id,{
      responseType: 'arraybuffer'
    });
  }

  generateAIModelJson(modelType: string | undefined):Observable<ModelJson>{
    if(!modelType) return of();
    return this.http.get<ModelJson>(this.config.api + "/core/model/create-from-ai/" + modelType);
  }

  entityToSchema(entityName:string,entities: Array<Entity>) : Observable<any>{
    return this.http.post<any>(this.config.api + "/core/model/entity-to-schema/" + entityName,entities);
  }

}
