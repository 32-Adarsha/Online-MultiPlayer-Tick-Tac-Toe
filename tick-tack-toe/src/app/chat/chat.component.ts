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
  messageList: {user:number , message:string}[] = [];
  userId:number = 0;
  constructor(private chatService: ChatService){
    this.userId = Math.floor(Math.random()*10 + 1)
  }

  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: any) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {
    this.chatService.sendMessage({user:this.userId , message:this.newMessage});
    this.newMessage = '';
  }


  
}
