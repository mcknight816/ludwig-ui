import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "../services/config";
import {Observable} from "rxjs";
import {Page} from "../services/page";
import {Application} from "../services/app-model";

@Injectable()
export class ConfigService {
  constructor(public http: HttpClient,public config:Config ) { }

  search(term:string = '',page:number = 0,limit:number = 50):Observable<Page<any>> {
    let url:string = this.config.api + "/core/config/search";
    const params = new HttpParams()
      .set('page', String(page))
      .set('term',term)
      .set('limit',limit);
    return this.http.get<Page<Application>>(url, {params});
  }

  list():Observable<Array<any>> {
    return this.http.get<Array<Application>>(this.config.api + "/core/config");
  }

  save(model: any):Observable<any>{
    return this.http.post<any>(this.config.api + "/core/config", model);
  }

  getById(id: string):Observable<any> {
    return this.http.get<any>(this.config.api + "/core/config/" + id);
  }

  removeById(id: string | null):Observable<any>{
    return this.http.delete<any>(this.config.api + "/core/config/" + id);
  }
}
