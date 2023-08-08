import { Component } from '@angular/core';
import { ChatroomsService } from 'src/app/core/services/chatrooms.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { httpErrorHandler } from 'src/app/http-error-handler';

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
		});
	};
	
	onCreateChatroom() : void {
		this.openModal();
	}

	triggerChatroomCreation() : void {
		const chatroomName: string = this.newChatroomForm.get('chatroomName')?.value;
		var password: string | null = this.newChatroomForm.get('accessPassword')?.value;
		
		this.closeModal();
		if (!password || password === "")
			password = null;
		this.chatroomsService.createChatroom(chatroomName, password).subscribe(
			data => {},
			httpErrorHandler
		);
	}

	openModal() : void {
		this.showModal = true;
	}

	closeModal() : void {
		this.showModal = false;
	}
}
