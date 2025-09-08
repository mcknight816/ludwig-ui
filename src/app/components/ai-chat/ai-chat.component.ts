import {Component, OnInit, ElementRef, ViewChild, NgZone} from '@angular/core';
import { ChatService } from '../../services/chat.service';
import {SpeechRecognitionService} from "./speech-recognition.service";
import {SpeechSynthesisService} from "./speech-synthesis.service";

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}
@Component({
  selector: 'app-ai-chat',
  templateUrl: './ai-chat.component.html',
  styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  isDarkMode: boolean = false;
  voices : SpeechSynthesisVoice[] = [];
  voice : string | null = null;
  // Buffers to manage interim vs final text
  private committedInput = '';
  private interimInput = '';

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(public zone: NgZone,private chatService: ChatService,private speechService: SpeechRecognitionService, private speechSynthesisService:SpeechSynthesisService) {
      this.messages.push({ role: 'ai', content: 'Hello! How can I assist you today?' });

      this.speechService.speechOutput.subscribe({
        next: (v) => {
          this.zone.run(() => {
            // v: { text, isFinal }
            if (v.isFinal) {
              // Append finalized text once and clear interim
              this.committedInput = (this.committedInput + ' ' + v.text).trim();
              this.interimInput = '';
            } else {
              // Replace interim each time (don’t append)
              this.interimInput = v.text;
            }
            // Show combined text to the user
            this.userInput = [this.committedInput, this.interimInput].filter(Boolean).join(' ').trim();

          });
        }
      });

      this.speechService.isFinished.subscribe(() => {
         this.sendMessage(true);
      });


      this.speechSynthesisService.isFinished.subscribe(() => {
        this.zone.run(() => {
          this.speakingPaused = false;
        });
      });

  }

  clearBuffers(){
    this.committedInput = '';
    this.interimInput = '';
    this.userInput = '';
  }
  ngOnInit(): void {
    this.speechSynthesisService.getVoices().subscribe(v =>{
      this.voices = v;
      this.setVoice();
    });
  }

  speak(text: string) {
    let theVoice : SpeechSynthesisVoice | undefined = this.voices.find(voice => voice.name === this.voice);
    this.speechSynthesisService.speak(text, theVoice ? theVoice : this.voices[0]);

  }

  start() {
    this.zone.run(() => {
      this.speechService.startListening();
    });
  }

  stop() {
    setTimeout(() => this.speechService.stopListening(), 100);
  }

  sendMessage(speakResponse: boolean = false) {
    this.callChat(this.userInput,speakResponse);
  }

  callChat(message: string = '',speakResponse: boolean = false){
    if (!message.trim()) return;
    this.messages.push({ role: 'user', content: message});
    this.clearBuffers();
    this.isLoading = true;
    this.scrollToBottom();
    this.zone.run(() => {
      this.callChatService(message, speakResponse);
    });
  }

  callChatService(userMessage: string,speakResponse: boolean = false): void {
    this.chatService.sendMessage(userMessage,"a-unique-session-id").subscribe({
      next: (v) => {
          this.messages.push({ role: 'ai', content: v.response });
          this.isLoading = false;
          this.scrollToBottom();
          this.zone.run(() => {
            if(speakResponse){
              this.speak(this.markdownToPlainText(v.response));
            }
          });
        },
      error: () => {
        let message = 'Error communicating with AI. You may need to configure Ai.';
        this.messages.push({ role: 'ai', content: message });
        if(speakResponse){this.speak(this.markdownToPlainText(message));}
        this.scrollToBottom();
        this.isLoading = false;
      },
      complete: () => console.info('complete')
    });
  }


  markdownToPlainText(markdown: string) {
    // Remove code blocks
    let plainText = markdown.replace(/```[\s\S]*?```/g, '');

    // Remove inline code
    plainText = plainText.replace(/`[^`]*`/g, '');

    // Remove headings
    plainText = plainText.replace(/^#+\s+/gm, '');

    // Remove links [text](url) and ![alt](url)
    plainText = plainText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    plainText = plainText.replace(/!\[([^\]]+)\]\([^)]+\)/g, '$1');

    // Remove emphasis (* or _ or ** or __ or ~~)
    plainText = plainText.replace(/[*_~]+/g, '');

    // Remove unordered list markers (-, *, +)
    plainText = plainText.replace(/^[-*+]\s+/gm, '');

    // Remove ordered list numbers (e.g., 1. Text)
    plainText = plainText.replace(/^\d+\.\s+/gm, '');

    // Remove extra spaces and trim
    plainText = plainText.replace(/\s+/g, ' ').trim();

    return plainText;
  }

  randomVoice(){
    this.voice = this.voices[Math.floor(Math.random() * this.voices.length)].name;
    localStorage.setItem('ai-voice',this.voice);
    this.setVoice();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  setVoice(){
    this.voice = localStorage.getItem('ai-voice');
  }

  changeVoice(event: Event) {
    if(event && event.target && event.target){
      const voiceName = (event.target as HTMLSelectElement).value;
      localStorage.setItem('ai-voice',voiceName);
      this.setVoice();
    }
  }
  speakingPaused: boolean = false;
  isSpeaking() {
    return this.speechSynthesisService.isSpeaking();
  }

  stopSpeaking() {
     this.speechSynthesisService.stopSpeaking();
  }

  pauseSpeaking() {
    this.speechSynthesisService.pauseSpeaking();
    this.speakingPaused = true;
  }

  continueSpeaking() {
    this.speakingPaused = false;
    this.speechSynthesisService.resumeSpeaking();
  }
}
