import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';

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
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages.push({ role: 'ai', content: 'Hello! How can I assist you today?' });
  }

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: this.userInput };
    this.messages.push(userMessage);
    this.isLoading = true;

    this.chatService.sendMessage(this.userInput,"sdassad-gfgf-fdsf").subscribe(
      (response) => {
        this.messages.push({ role: 'ai', content: response.response });
        this.isLoading = false;
        this.scrollToBottom();
      },
      (error) => {
        this.messages.push({ role: 'ai', content: 'Error communicating with AI. Please try again.' });
        this.isLoading = false;
      }
    );

    this.userInput = ''; // Clear input field
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
