import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "../services/config";
import {Observable} from "rxjs";
import {KnowledgeBase} from "./knowledge.model";

@Injectable({
    providedIn: 'root' // make the service available app-wide (fixes NullInjectorError)
  }
)
export class KnowledgeBaseService {
  constructor(public http: HttpClient, public config: Config) {
  }
  list(): Observable<Array<KnowledgeBase>> {
    return this.http.get<Array<KnowledgeBase>>(this.config.api + "/core/knowledge-base");
  }

  save(model: KnowledgeBase): Observable<KnowledgeBase>{
    return this.http.post<KnowledgeBase>(this.config.api + "/core/knowledge-base", model);
  }

  getById(id: string): Observable<KnowledgeBase> {
    return this.http.get<KnowledgeBase>(this.config.api + "/core/knowledge-base/" + id);
  }

  removeById(id: string | null): Observable<any>{
    return this.http.delete<void>(this.config.api + "/core/knowledge-base/" + id);
  }
}
