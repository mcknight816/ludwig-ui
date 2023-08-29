import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Config} from "./config";
import {Observable} from "rxjs";
import  {Flow}  from "./app-model";
import {Page} from "./page";

@Injectable()
export class FlowService {
    constructor(public http: HttpClient,public config:Config ) { }

    search(term:string = '',page:number = 0,limit:number = 50):Observable<Page<Flow>> {
        let url:string = this.config.api + "/rest/flow/search";
        const params = new HttpParams()
        .set('page', String(page))
        .set('term',term)
        .set('limit',limit);
        return this.http.get<Page<Flow>>(url, {params});
    }

    list():Observable<Array<Flow>> {
        return this.http.get<Array<Flow>>(this.config.api + "/rest/flow");
    }

    save(model: Flow):Observable<Flow>{
        return this.http.post<Flow>(this.config.api + "/rest/flow", model);
    }

    getById(id: string):Observable<Flow> {
        return this.http.get<Flow>(this.config.api + "/rest/flow/" + id);
    }

    removeById(id: string | null):Observable<any>{
        return this.http.delete<any>(this.config.api + "/rest/flow/" + id);
    }
}
