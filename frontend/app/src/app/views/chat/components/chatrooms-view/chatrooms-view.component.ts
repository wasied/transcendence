import { Component } from '@angular/core';
import { ChatroomsService } from 'src/app/core/services/chatrooms.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-chatrooms-view',
	templateUrl: './chatrooms-view.component.html',
	styleUrls: ['./chatrooms-view.component.css']
})
export class ChatroomsViewComponent {

	newChatroomForm!: FormGroup;
	showModal: boolean = false;
	
	constructor (private chatroomsService: ChatroomsService,
				 private formBuilder : FormBuilder) 
	{
		this.newChatroomForm = this.formBuilder.group({
			chatroomName : [''],
			accessStatus : [''],
			accessPassword : [''],
			accessPasswordVerif : ['']
		});
	};
	
	onCreateChatroom() : void {
		this.openModal();
	}

	triggerChatroomCreation() : void {
		const chatroomName: string = this.newChatroomForm.get('chatroomName')?.value;
		const owner: number = 1; // placeholder, change that
		const accessStatus: string = this.newChatroomForm.get('accessStatus')?.value;
		const password: string = this.newChatroomForm.get('chatroomName')?.value;

		console.log('chatroom name = ', chatroomName, ', ownerid = ', owner, ' access status = ', accessStatus,
		', and password = ', password); // debug
		
		this.closeModal();
		console.log('will trigger the chatroom creation');
		// this.chatroomsService.createChatroom(chatroomName, owner, accessStatus, password);
	}

	openModal() : void {
		this.showModal = true;
	}

	closeModal() : void {
		this.showModal = false;
	}
}
