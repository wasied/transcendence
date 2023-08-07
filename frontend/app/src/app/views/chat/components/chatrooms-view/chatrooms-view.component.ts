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
		const accessStatus: string = this.newChatroomForm.get('accessStatus')?.value;
		const password: string = this.newChatroomForm.get('accessPassword')?.value;
		
		this.closeModal();
		// this.chatroomsService.createChatroom(chatroomName, owner, accessStatus, password);
		this.chatroomsService.createChatroom(chatroomName, false, password);
	}

	openModal() : void {
		this.showModal = true;
	}

	closeModal() : void {
		this.showModal = false;
	}
}
