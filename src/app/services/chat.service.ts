import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from "./config";
import {Application} from "./app-model";

interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root' // Available globally
})
export class ChatService {

  constructor(private http: HttpClient,public config:Config) {}

  sendMessage(message: string,sessionId: string, selectedApps : Array<Application> ): Observable<ChatResponse> {
    let apps = selectedApps.map(a => a.id).join(',');
    return this.http.post<ChatResponse>(this.config.api  + "/core/application/chat/" + sessionId, { message,apps });
  }
}
