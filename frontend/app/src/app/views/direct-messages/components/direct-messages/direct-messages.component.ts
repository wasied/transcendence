import { Component, OnInit } from '@angular/core';
import { Chatroom } from 'src/app/core/models/chatroom.model';
import { DirectMessagesService } from 'src/app/core/services/direct-messages.service'
import { DirectMessagesWebsocketService } from 'src/app/core/services/direct-messages-websocket.service'
import { UsersService } from 'src/app/core/services/users.service'; 
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-direct-messages',
	templateUrl: './direct-messages.component.html',
	styleUrls: ['./direct-messages.component.css']
})
export class DirectMessagesComponent implements OnInit {

	private destroyed: boolean = false;
	directMessages!: Chatroom[];

	constructor (
		private directMessageService: DirectMessagesService,
		private usersService: UsersService,
		private directMessagesWebsocketService: DirectMessagesWebsocketService
	) {}
  
	ngOnInit(): void {
		this.directMessagesWebsocketService.listenToServerEvents();
		this.directMessagesWebsocketService.directMessages$.subscribe(
			(directMessages: Chatroom[]) => { this.directMessages = directMessages; },
			httpErrorHandler
		);
		this.directMessagesWebsocketService.connect();
	}

}
