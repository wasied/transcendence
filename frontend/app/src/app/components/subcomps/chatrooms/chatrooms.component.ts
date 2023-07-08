import { Component, OnInit } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom.model';
import { ChatroomsService } from 'src/app/services/chatrooms.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.component.html',
  styleUrls: ['./chatrooms.component.css']
})
export class ChatroomsComponent implements OnInit {
  
  chatrooms$!: Observable<Chatroom[]>;
  
  constructor (private chatroomService: ChatroomsService) {}
  
  ngOnInit(): void {
    this.chatrooms$ = this.chatroomService.getAllChatrooms();
  }
}
