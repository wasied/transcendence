import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DirectMessagesWebsocketService } from 'src/app/core/services/direct-messages-websocket.service';
import { User } from '../../../../core/models/user.model';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-dm-handler',
  	template: ''
})
export class DmHandlerComponent implements OnInit {

	newDmForm!: FormGroup;
	
	constructor(
		private fb: FormBuilder,
		private directMessagesWebsocketService: DirectMessagesWebsocketService
	) {}
	
	ngOnInit(): void {
		this.initForm();
	}

	private initForm() {
		this.newDmForm = this.fb.group({
			userName: [''],
			userId: ['']
		});
	}

	setUser(user: User) {
		this.newDmForm.patchValue({
		  	userName: user.username,
		  	userId: user.id
		});
		this.createNewDirectMessage();
	}

	private createNewDirectMessage() : void {
		const otherUserId = this.newDmForm.get('userId')?.value;
		if (!otherUserId) {
			console.error("Invalid user id");
			return ;
		}
		this.directMessagesWebsocketService.createDirectMessage(otherUserId);
	}
}
