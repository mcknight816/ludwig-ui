import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "../services/config";
import {Observable} from "rxjs";
import {ActivityConfig, ConfigTestResult, FlowConfig} from "./flow-config.model";


@Injectable()
export class ActivityConfigService {
  constructor(public http: HttpClient,public config:Config ) { }

  list():Observable<Array<ActivityConfig>> {
    return this.http.get<Array<ActivityConfig>>(this.config.api + "/meta/config");
  }

  getById(id: string):Observable<ActivityConfig> {
    return this.http.get<ActivityConfig>(this.config.api + "/meta/config/" + id);
  }

  test(model: FlowConfig): Observable<ConfigTestResult>{
    return this.http.post<ConfigTestResult>(this.config.api + "/meta/config/test", model);
  }
}
