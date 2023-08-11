import { Component, OnInit } from '@angular/core';
import { Chatroom } from 'src/app/core/models/chatroom.model'; 
import { ChatroomsService } from 'src/app/core/services/chatrooms.service'; 
import { Observable } from 'rxjs';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-chatrooms',
	templateUrl: './chatrooms.component.html',
	styleUrls: ['./chatrooms.component.css']
})
export class ChatroomsComponent implements OnInit {
  
	chatrooms$!: Observable<Chatroom[]>;
  
	constructor (private chatroomsService: ChatroomsService) {}
  
	ngOnInit(): void {
		this.chatrooms$ = this.loadChatrooms();
	}

	loadChatrooms() : Observable<Chatroom[]> {
		return this.chatroomsService.getAllChatrooms();
	}

	deleteChatroom(chatroom: Chatroom) { // should be handle by an observable
		this.chatroomsService.delChatroom(chatroom.id).subscribe(
			data => {},
			httpErrorHandler
		);
	}
}
