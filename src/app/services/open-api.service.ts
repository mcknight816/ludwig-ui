import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "./config";
import {Observable} from "rxjs";

@Injectable()
export class OpenApiService{
  constructor(public http: HttpClient,public config:Config ) {

  }
  getApiJson(appId: string):Observable<any> {
    return this.http.get<any>(this.config.api + "/api/swagger/" + appId);
  }

}
