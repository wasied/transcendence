import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chatroom } from 'src/app/core/models/chatroom.model'; 
import { ChatroomsService } from 'src/app/core/services/chatrooms.service'; 
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service'; 
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-chatrooms',
	templateUrl: './chatrooms.component.html',
	styleUrls: ['./chatrooms.component.css']
})
export class ChatroomsComponent implements OnInit, OnDestroy {
  
	chatrooms$!: Observable<Chatroom[]>;
  
	constructor (private chatroomsService: ChatroomsService,
				 private usersService: UsersService) {}
  
	ngOnInit(): void {
		this.chatrooms$ = this.loadChatrooms();
	}

	loadChatrooms() : Observable<Chatroom[]> {
<<<<<<< HEAD
		return this.chatroomsService.getHardcodedChatrooms(); // change that
		// return this.chatroomsService.getAllChatrooms();
=======
		return this.chatroomsService.getAllChatrooms();
>>>>>>> 2abd1b0db414530d5850ac29f7181635f8a17a32
	}

	deleteChatroom(chatroom: Chatroom) {
		this.chatroomsService.delChatroom(chatroom.id).subscribe(
			data => {},
			httpErrorHandler
		);
	}

	ngOnDestroy(): void {
		
	}
}
