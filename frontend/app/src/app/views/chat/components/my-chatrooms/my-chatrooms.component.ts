import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chatroom } from 'src/app/core/models/chatroom.model'; 
import { ChatroomsService } from 'src/app/core/services/chatrooms.service'; 
import { Observable, shareReplay, Subscription } from 'rxjs';
import { httpErrorHandler } from 'src/app/http-error-handler';
import { ChatWebsocketService } from 'src/app/core/services/chat-websocket.service';

@Component({
	selector: 'app-my-chatrooms',
	templateUrl: './my-chatrooms.component.html',
	styleUrls: ['./my-chatrooms.component.css']
})
export class MyChatroomsComponent implements OnInit {
  
	chatrooms!: Chatroom[];
  
	constructor (
		private chatroomsService: ChatroomsService,
		private chatWebsocketService: ChatWebsocketService
	) {}
  
	ngOnInit(): void {
		this.chatWebsocketService.listenToServerEvents();
		this.chatWebsocketService.connect();
		this.chatWebsocketService.myRooms$.subscribe(myChatrooms => { this.chatrooms = myChatrooms; });
	}

	onDeleteRequest(chatroom: Chatroom) {
		console.log('go there');
		console.log(chatroom);
		this.chatWebsocketService.deleteRoom(chatroom.id);
	}
}