import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public messagee$: BehaviorSubject<any> = new BehaviorSubject('');
  constructor() {}

  socket = io('http://localhost:3000');

  public sendMessage(message: any) {
    console.log('sendMessage: ', message)
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  public joinGame = () => {
    this.socket.on('joinedLobby' , (message) => {
      this.messagee$.next(message);
    });

    return this.messagee$.asObservable();
  }


  public toTest = () => {
    this.socket.emit('playOnline' , "")
  }
}