import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare var webkitSpeechRecognition: any;
@Injectable({ providedIn: 'root' })
export class SpeechRecognitionService {
  private recognition = new webkitSpeechRecognition();
  private listeningDesired = false;

  public speechOutput = new Subject<{ text: string; isFinal: boolean }>();
  public isFinished = new Subject<void>();

  constructor() {
    this.recognition.lang = navigator.language || 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      // Use the latest result chunk
      const idx = event.resultIndex;
      const res = event.results[idx];
      const transcript = res[0]?.transcript?.trim() ?? '';

      // Emit both interim and final; the component will handle how to display
      this.speechOutput.next({ text: transcript, isFinal: res.isFinal });

    };

    // Fires when the service stops (silence, network, or internal stop)
    this.recognition.onend = () => {
      // If we still want to listen, auto-restart
      if (this.listeningDesired) {
        try {
          this.recognition.start();
        } catch {
          // Swallow "start" errors when already starting; browsers can be finicky
        }
      } else {
        // Only when listening was intentionally stopped, signal finished
        this.isFinished.next();
      }
    };

    // Optional: handle errors and try to continue when appropriate
    this.recognition.onerror = (e: any) => {
      // Abort-only errors should not loop restarts; others can be retried
      if (e.error === 'aborted' || e.error === 'not-allowed') {
        this.listeningDesired = false;
        this.isFinished.next();
        return;
      }
      if (this.listeningDesired) {
        try { this.recognition.start(); } catch {}
      }
    };
  }

  startListening() {
    this.listeningDesired = true;
    try {
      this.recognition.start();
    } catch {
      // Ignore if already started
    }
  }

  stopListening() {
    this.listeningDesired = false;
    try {
      this.recognition.stop();
    } catch {}
  }
}
