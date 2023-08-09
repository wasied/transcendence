import { Component, OnInit } from '@angular/core';
import { Chatroom } from 'src/app/core/models/chatroom.model';
import { DirectMessagesService } from 'src/app/core/services/direct-messages.service'
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service'; 

@Component({
	selector: 'app-direct-messages',
	templateUrl: './direct-messages.component.html',
	styleUrls: ['./direct-messages.component.css']
})
export class DirectMessagesComponent implements OnInit {

	directMessages$!: Observable<Chatroom[]>;

	constructor (private directMessageService: DirectMessagesService,
				 private usersService: UsersService) {}
  
	ngOnInit(): void {
		this.directMessages$ = this.loadDirectMessages();
	}

	loadDirectMessages() : Observable<Chatroom[]> {
		return this.directMessageService.getMyDirectMsgs();
	}
}
