import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { Chatroom } from 'src/app/core/models/chatroom.model';
import { ChatroomsService } from 'src/app/core/services/chatrooms.service';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
  	selector: 'app-chatroom-header',
  	templateUrl: './chatroom-header.component.html',
  	styleUrls: ['./chatroom-header.component.css']
})
export class ChatroomHeaderComponent implements OnInit {

	@Input() chatroomId!: number	
	chatroom$!: Observable<Chatroom>;
	setPasswordForm!: FormGroup;
	modifyPasswordForm!: FormGroup;
	passwordProtected!: boolean;
	passwordPresent: boolean = false;
	showModalMenu: boolean = false;
	showChangePasswordForm: boolean = false;

	constructor (private router: Router, 
				 private chatroomsService: ChatroomsService, 
				 private formBuilder: FormBuilder) 
	{
		this.setPasswordForm = this.formBuilder.group({
			password: ['']
		});

		this.modifyPasswordForm = this.formBuilder.group({
			newPassword: ['']
		});
	}

	ngOnInit(): void {
		this.chatroom$ = this.chatroomsService.getChatroomByID(this.chatroomId).pipe(
			shareReplay(1)
		);
		
		this.chatroom$.subscribe(data => {
			if (data.password === null) {
				this.passwordProtected = false;
			} else {
				this.passwordProtected = true;
			}
		});		
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

	addPassword() : void {
		const password : string = this.setPasswordForm.get('password')?.value;
		
		this.chatroomsService.modifyChatroomPassword(this.chatroomId, password).subscribe(
			data => {},
			httpErrorHandler
		);
		this.passwordPresent = true;
	}

	changePassword() : void {
		this.changePasswordFormDisplayStatus();

		const newPassword : string = this.modifyPasswordForm.get('newPassword')?.value;

		this.chatroomsService.modifyChatroomPassword(this.chatroomId, newPassword).subscribe(
			data => {},
			httpErrorHandler
		);
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

	removeYourselfFromChatroom() : void {
		this.chatroomsService.delParticipantFromChatroom(this.chatroomId).subscribe(
			data => {},
			httpErrorHandler
		);
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
