import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Chatroom } from 'src/app/core/models/chatroom.model';
import { ChatroomsService } from 'src/app/core/services/chatrooms.service';
import { httpErrorHandler } from 'src/app/http-error-handler';
import { ChatWebsocketService } from 'src/app/core/services/chat-websocket.service';

@Component({
  	selector: 'app-chatroom-header',
  	templateUrl: './chatroom-header.component.html',
  	styleUrls: ['./chatroom-header.component.css']
})
export class ChatroomHeaderComponent implements OnInit, OnDestroy {

	@Input() chatroomId!: number	

	chatroom!: Chatroom;
	setPasswordForm!: FormGroup;
	modifyPasswordForm!: FormGroup;
	passwordProtected!: boolean;
	passwordPresent: boolean = false;
	showModalMenu: boolean = false;
	showChangePasswordForm: boolean = false;

	constructor (private router: Router, 
				 private chatroomsService: ChatroomsService, 
				 private formBuilder: FormBuilder,
				 private chatWebsocketService: ChatWebsocketService) 
	{
		this.setPasswordForm = this.formBuilder.group({
			password: ['']
		});

		this.modifyPasswordForm = this.formBuilder.group({
			newPassword: ['']
		});
	}

	ngOnInit(): void {
		this.chatWebsocketService.listenToServerEvents();
		this.chatWebsocketService.connect();
		this.chatWebsocketService.rooms$.subscribe(chatrooms => { 
			for (let i = 0; i < chatrooms.length; i++) {
				if (chatrooms[i].id === this.chatroomId)
					this.chatroom = chatrooms[i];
			}

			if (this.chatroom.password === null || this.chatroom.password === undefined) {
				this.passwordProtected = false;
			} else {
				this.passwordProtected = true;
			}
		});
	}

	ngOnDestroy(): void {
		//this.chatWebsocketService.rooms$.unsubscribe();
	}

	changePasswordFormDisplayStatus() : void {
		this.showChangePasswordForm = !this.showChangePasswordForm;
	}

	isPasswordPresent() : boolean {
		return this.passwordPresent;
	}

	isUserAnOwner() : boolean {
		// backend will block if the user is not allowed
		return true; // implement logic later
	}

	/* PRIVACY/PASSWORD MODIFCATION */

	async addPassword() : Promise<void> {
		const password : string = this.setPasswordForm.get('password')?.value;
		
		await this.chatroomsService.modifyChatroomPassword(this.chatroomId, password).toPromise()
			.catch(err => { httpErrorHandler(err); });
		this.passwordPresent = true;
	}

	async changePassword() : Promise<void> {
		this.changePasswordFormDisplayStatus();

		const newPassword : string = this.modifyPasswordForm.get('newPassword')?.value;

		await this.chatroomsService.modifyChatroomPassword(this.chatroomId, newPassword).toPromise()
			.catch(err => { httpErrorHandler(err); });
	}

	onTogglePasswordChange(event: Event) : void {
		const target = event.target as HTMLInputElement;
		const isChecked = target.checked;

		if (isChecked) {
			this.passwordProtected = true;
		} else {
			this.passwordProtected = false;
			this.passwordPresent = false;
		}
	}

	isChatroomPasswordProtected() : boolean {
		if (this.passwordProtected === true)
			return true;
		return false;
	}

	/* EXITING CHATROOM METHODS */

	async removeYourselfFromChatroom() : Promise<void> {
		await this.chatroomsService.delParticipantFromChatroom(this.chatroomId).toPromise()
			.catch(err => { httpErrorHandler(err); });
		this.onExitingChatroomSession();
	}
	
	onExitingChatroomSession() : void {
		this.router.navigate(['main/chatrooms']);
	}
	
	/* MODAL HANDLING */

	openModalMenu() : void {
		this.showModalMenu = true;
	}

	closeModalMenu() : void {
		this.showModalMenu = false;
	}
}
