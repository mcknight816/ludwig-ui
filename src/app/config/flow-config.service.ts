import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "../services/config";
import {Observable} from "rxjs";
import {Page} from "../services/page";
import {ConfigTestResult, FlowConfig} from "./flow-config.model";

@Injectable()
export class FlowConfigService {
  constructor(public http: HttpClient,public config:Config ) { }

  search(term:string = '',page:number = 0,limit:number = 50): Observable<Page<FlowConfig>> {
    let url:string = this.config.api + "/core/config/search";
    const params = new HttpParams()
      .set('page', String(page))
      .set('term',term)
      .set('limit',limit);
    return this.http.get<Page<FlowConfig>>(url, {params});
  }

  list(): Observable<Array<FlowConfig>> {
    return this.http.get<Array<FlowConfig>>(this.config.api + "/core/config");
  }

  save(model: FlowConfig): Observable<FlowConfig>{
    return this.http.post<FlowConfig>(this.config.api + "/core/config", model);
  }

  getById(id: string): Observable<FlowConfig> {
    return this.http.get<FlowConfig>(this.config.api + "/core/config/" + id);
  }

  removeById(id: string | null): Observable<FlowConfig>{
    return this.http.delete<FlowConfig>(this.config.api + "/core/config/" + id);
  }


}
