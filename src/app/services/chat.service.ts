import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Config} from "./config";

interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root' // Available globally
})
export class ChatService {

  constructor(private http: HttpClient,public config:Config) {}

  sendMessage(message: string,sessionId: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.config.api  + "/core/application/chat/" + sessionId, { message });
  }
}
