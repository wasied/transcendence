import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Chatroom } from 'src/app/core/models/chatroom.model';
import { ChatroomsService } from 'src/app/core/services/chatrooms.service';

@Component({
  	selector: 'app-chatroom-header',
  	templateUrl: './chatroom-header.component.html',
  	styleUrls: ['./chatroom-header.component.css']
})
export class ChatroomHeaderComponent implements OnInit {

	chatroom$!: Observable<Chatroom>;
	setPasswordForm!: FormGroup;
	modifyPasswordForm!: FormGroup;
	passwordProtected!: boolean;
	passwordPresent: boolean = false;
	showModalMenu: boolean = false;
	showChangePasswordForm: boolean = false;

	constructor (private router: Router, private route: ActivatedRoute,
		private chatroomsService: ChatroomsService, private formBuilder: FormBuilder) 
	{
		this.setPasswordForm = this.formBuilder.group({ // add authenticators
			password: [''],
			passwordVerif: ['']
		});

		this.modifyPasswordForm = this.formBuilder.group({ // add authenticators
			oldPassword: [''],
			newPassword: [''],
			newPasswordVerif: ['']
		});
	};

	ngOnInit(): void {
		const id: string | null = this.route.snapshot.paramMap.get('id');
		
		if (id) {
			this.chatroom$ = this.chatroomsService.getHarcodedChatroomById(+id);
		}
		else
			; // raise error there I guess
		
		this.passwordProtected = false; // add some logic there
	}

	changePasswordFormDisplayStatus() : void {
		this.showChangePasswordForm = !this.showChangePasswordForm;
	}

	// booleans

	isPasswordPresent() : boolean {
		return this.passwordPresent;
	}

	isUserAnOwner() : boolean {
		return true; // implement logic later
	}

	// modal handlers

	addPassword() : void {
		console.log('adding password : logic not implemented yet');
		this.passwordPresent = true;
	}

	changePassword() : void {
		this.changePasswordFormDisplayStatus();
		console.log('password change : logic not implemented yet !');
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

	// exiting chatroom methods

	removeYourselfFromChatroom() : void {
		// implement logic there
		this.onExitingChatroomSession();
	}
	
	onExitingChatroomSession() : void {
		this.router.navigate(['main/chatrooms']);
	}
	
	// modal handling

	openModalMenu() : void {
		this.showModalMenu = true;
	}

	closeModalMenu() : void {
		console.log('Closing modal from parent...');
		this.showModalMenu = false;
	}
}
