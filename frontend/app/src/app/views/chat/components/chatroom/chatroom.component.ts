import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Chatroom } from 'src/app/core/models/chatroom.model'; 

@Component({
	selector: 'app-chatroom',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent {
  
	@Input () chatroom!: Chatroom;
	@Output() deleteRequest = new EventEmitter<Chatroom>();

	constructor(private router: Router) {}

	accessChatroom(chatroomId: number) : void {
		this.router.navigate(['main/chatrooms', chatroomId]); // check if functional
	}
	
	deleteChatroom() : void {
		this.deleteRequest.emit(this.chatroom);
	}
}
