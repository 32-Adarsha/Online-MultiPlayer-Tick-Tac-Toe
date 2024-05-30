import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for standalone component
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule ,FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'] // Corrected property name
})
export class ChatComponent {
  newMessage = '';
  messageList: string[] = [];

  constructor(private chatService: ChatService){}

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }


  
}
