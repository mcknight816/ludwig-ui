import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "../services/config";
import {Observable} from "rxjs";

import {Knowledge} from "./knowledge.model";

@Injectable()
export class KnowledgeService {
  constructor(public http: HttpClient, public config: Config) {
  }

  list(): Observable<Array<Knowledge>> {
    return this.http.get<Array<Knowledge>>(this.config.api + "/core/knowledge");
  }

  search(baseId:string | undefined): Observable<Array<Knowledge>> {
    return this.http.get<Array<Knowledge>>(this.config.api + "/core/knowledge/search/" + baseId);
  }

  save(model: Knowledge): Observable<Knowledge>{
    return this.http.post<Knowledge>(this.config.api + "/core/knowledge", model);
  }

  getById(id: string): Observable<Knowledge> {
    return this.http.get<Knowledge>(this.config.api + "/core/knowledge/" + id);
  }

  removeById(id: string | undefined): Observable<any>{
    return this.http.delete<void>(this.config.api + "/core/knowledge/" + id);
  }
}
