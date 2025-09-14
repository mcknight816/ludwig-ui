import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "./config";
import {Observable} from "rxjs";
import {Page} from "./page";
import {Application} from "./app-model";

@Injectable( {
    providedIn: 'root' // make the service available app-wide (fixes NullInjectorError)
  }
)
export class ApplicationService {
  constructor(public http: HttpClient,public config:Config ) { }

  search(term:string = '',page:number = 0,limit:number = 50):Observable<Page<Application>> {
    let url:string = this.config.api + "/core/application/search";
    const params = new HttpParams()
      .set('page', String(page))
      .set('term',term)
      .set('limit',limit);
    return this.http.get<Page<Application>>(url, {params});
  }

  list():Observable<Array<Application>> {
    return this.http.get<Array<Application>>(this.config.api + "/core/application");
  }

  save(model: Application):Observable<Application>{
    console.log(model);
    return this.http.post<Application>(this.config.api + "/core/application", model);
  }

  getById(id: string):Observable<Application> {
    return this.http.get<Application>(this.config.api + "/core/application/" + id);
  }

  removeById(id: string | null):Observable<Application>{
    return this.http.delete<Application>(this.config.api + "/core/application/" + id);
  }
}
