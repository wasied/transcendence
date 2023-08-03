import { Component } from '@angular/core';

@Component({
	selector: 'app-chatrooms-view',
	templateUrl: './chatrooms-view.component.html',
	styleUrls: ['./chatrooms-view.component.css']
})
export class ChatroomsViewComponent {

	onCreateChatroom() : void {
		console.log('Chatroom creation : feature not implemented yet !');
	}
}
