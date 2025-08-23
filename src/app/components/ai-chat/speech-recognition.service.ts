import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare var webkitSpeechRecognition: any;

@Injectable({ providedIn: 'root' })
export class SpeechRecognitionService {
  private recognition = new webkitSpeechRecognition();
  public speechOutput = new Subject<string>();
  public isFinished = new Subject<void>();
  constructor() {
    this.recognition.lang = navigator.language || 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 25;
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();
      this.speechOutput.next(transcript);
    };

    this.recognition.onspeechend = () => {
      this.isFinished.next();
      this.stopListening();
    };
  }
  startListening() { this.recognition.start(); }
  stopListening() { this.recognition.stop();}
}
