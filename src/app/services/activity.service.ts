import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "./config";
import {Observable} from "rxjs";
import {Activity} from "./app-model";

@Injectable()
export class ActivityService {
  constructor(public http: HttpClient,public config:Config ) { }

  list():Observable<Array<Activity>> {
    return this.http.get<Array<Activity>>(this.config.api + "/meta/activity");
  }

  getById(id: string):Observable<Activity> {
    return this.http.get<Activity>(this.config.api + "/meta/activity/" + id);
  }

}
