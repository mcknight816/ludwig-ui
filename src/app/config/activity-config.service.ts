import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "../services/config";
import {Observable} from "rxjs";
import {ConfigTestResult, FlowConfig} from "./flow-config.model";


@Injectable()
export class ActivityConfigService {
  constructor(public http: HttpClient,public config:Config ) { }

  list():Observable<Array<any>> {
    return this.http.get<Array<any>>(this.config.api + "/meta/config");
  }

  getById(id: string):Observable<any> {
    return this.http.get<any>(this.config.api + "/meta/config/" + id);
  }

  test(model: FlowConfig): Observable<ConfigTestResult>{
    return this.http.post<ConfigTestResult>(this.config.api + "/meta/config/test", model);
  }
}
