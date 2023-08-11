import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatWebsocketService } from 'src/app/core/services/chat-websocket.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-chatrooms-view',
	templateUrl: './chatrooms-view.component.html',
	styleUrls: ['./chatrooms-view.component.css']
})
export class ChatroomsViewComponent implements OnInit {

	newChatroomForm!: FormGroup;
	showModal: boolean = false;
	
	constructor (
				 private formBuilder : FormBuilder,
				 private chatWebsocketService: ChatWebsocketService
	)
	{
		this.newChatroomForm = this.formBuilder.group({
			chatroomName : [''],
			accessStatus : [''],
			accessPassword : ['']
		});
	};

	ngOnInit(): void {
		this.chatWebsocketService.connect();
	}
	
	onCreateChatroom() : void {
		this.openModal();
	}

	triggerChatroomCreation() : void {
		const chatroomName: string = this.newChatroomForm.get('chatroomName')?.value;
		let password: string | null = this.newChatroomForm.get('accessPassword')?.value;
		
		this.closeModal();
		if (!password || password === "")
			password = null;
		this.chatWebsocketService.createRoom(chatroomName, password, false, 0);
	}

	openModal() : void {
		this.showModal = true;
	}

	closeModal() : void {
		this.showModal = false;
	}
}
