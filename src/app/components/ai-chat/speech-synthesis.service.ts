import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({ providedIn: 'root' })
export class SpeechSynthesisService {
  private synth = window.speechSynthesis;
  private voicesSubject = new BehaviorSubject<SpeechSynthesisVoice[]>([]); // Observable to track voices.
  public isFinished = new Subject<void>();
  constructor() {
    // Wait for voices to be loaded
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => {
        this.updateVoices();
      };
    }

    // Initialize voices when the class is instantiated
    this.updateVoices();
  }
  private updateVoices() {
    const voices = this.synth.getVoices();
    this.voicesSubject.next(voices);
  }

  speak(text: string,voice: SpeechSynthesisVoice) {
    const utterance = new SpeechSynthesisUtterance(text);
   // utterance.lang = navigator.language || 'en-US';
    utterance.voice = voice;

    utterance.onend = () => {
      this.isFinished.next();
    }
    this.synth.speak(utterance);

  }

  // Expose voices as an observable
  getVoices(): Observable<SpeechSynthesisVoice[]> {
    return this.voicesSubject.asObservable();
  }

}
