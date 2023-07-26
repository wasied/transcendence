import { Component, Input } from '@angular/core';
import { Chatroom } from 'src/app/core/models/chatroom.model'; 

@Component({
	selector: 'app-chatroom',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent {
  
	@Input () chatroom!: Chatroom;
}
