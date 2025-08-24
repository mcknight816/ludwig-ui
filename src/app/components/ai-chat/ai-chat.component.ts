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
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(public zone: NgZone,private chatService: ChatService,private speechService: SpeechRecognitionService, private speechSynthesisService:SpeechSynthesisService) {
    this.messages.push({ role: 'ai', content: 'Hello! How can I assist you today?' });
    this.speechService.speechOutput.subscribe({
      next: (v) => {
        this.zone.run(() => {
          this.userInput = v;
        });
      }
    });
    this.speechService.isFinished.subscribe(v => {this.sendMessage(true)});
  }

  ngOnInit(): void {
    this.speechSynthesisService.getVoices().subscribe(v =>{
      this.voices = v;
      this.setVoice()
    });
  }

  speak(text: string) {
    let theVoice : SpeechSynthesisVoice | undefined = this.voices.find(voice => voice.name === this.voice);
    this.speechSynthesisService.speak(text, theVoice ? theVoice : this.voices[0]);
  }

  start() { this.speechService.startListening();}
  stop() { this.speechService.stopListening();}
  sendMessage(speakResponse: boolean = false): void {
    if (!this.userInput.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: this.userInput };
    this.messages.push(userMessage);
    this.isLoading = true;
    this.chatService.sendMessage(this.userInput,"a-unique-session-id").subscribe({
      next: (v) => {
          this.messages.push({ role: 'ai', content: v.response });
          this.isLoading = false;
          this.scrollToBottom();
          this.zone.run(() => {
            if(speakResponse){
              this.speak(this.markdownToPlainText(v.response));
            }
            this.userInput = ''; // Clear input field

          });
        },
      error: () => {
        this.messages.push({ role: 'ai', content: 'Error communicating with AI. Please try again.' });
        this.isLoading = false;
      },
      complete: () => console.info('complete')
    });

    this.scrollToBottom();
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

  conversationInitialized: boolean = false;
  isUserInput: boolean = true;
  simulateConversation(){
    this.isUserInput = true;
    if(!this.conversationInitialized){
      this.speechSynthesisService.isFinished.subscribe(()=> {
        if(!this.isUserInput){this.simulateConversation();}
      });
      this.conversationInitialized = true;
    }
    const userMessage: ChatMessage = { role: 'user', content: this.userInput };
    this.randomVoice();
    this.speak(this.userInput);
    this.messages.push(userMessage);
    this.chatService.sendMessage( this.userInput,"a-unique-session-id").subscribe({
      next: (v) => {
        this.messages.push({ role: 'ai', content: v.response });
        this.userInput = '';
        this.randomVoice();
        this.scrollToBottom();
        this.speak(v.response);
        this.isUserInput = false;
        this.createAQuestionBasedOnTheResponse(v.response);
      }
    });
  }

  createAQuestionBasedOnTheResponse(response: string){
    this.chatService.sendMessage( 'create a question based on this response data :' + response,"a-unique-session-id").subscribe({
      next: (v) => {
        this.userInput = v.response;
      }
    });
  }

  randomVoice(){
    this.voice = this.voices[Math.floor(Math.random() * this.voices.length)].name;
    localStorage.setItem('ai-voice',this.voice);
    this.setVoice();
  }

}
