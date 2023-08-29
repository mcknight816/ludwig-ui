import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
export interface DocNode {
  name: string;
  ref?: string;
  children?: DocNode[];
}

@Injectable({
  providedIn: 'root'
})
export class DocService {
  constructor(private http: HttpClient) { }

  public readDoc(doc:string ):  Observable<string> {
    return this.http.get('assets/docs/' + doc, { responseType: 'text' });
  }
}
