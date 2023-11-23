import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Activity, Flow, FlowTemplate} from "./app-model";
import {HttpClient} from "@angular/common/http";
import {Config} from "./config";

@Injectable()
export class FlowTemplateService {
  constructor(public http: HttpClient,public config:Config ) { }
  list():Observable<Array<FlowTemplate>> {
    return this.http.get<Array<FlowTemplate>>(this.config.api + "/meta/template");
  }
  create(flowTemplate: FlowTemplate):Observable<Flow>{
     flowTemplate.schema = null;
    return this.http.post<Flow>(this.config.api + "/meta/template", flowTemplate);
  }
}
