import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UsersService } from '../../../../core/services/users.service';

@Component({
	selector: 'app-info-security',
	templateUrl: './info-security.component.html'
})
export class InfoSecurityComponent {

	picForm!: FormGroup;
	usernameForm!: FormGroup;
	
	showModalUsername: boolean = false;
	showModalPic: boolean = false;
	showModal2FA: boolean = false;

	twoFactorAuthQR!: string;

	constructor (private formBuilder: FormBuilder, 
				 private auth: AuthenticationService,
				 private usersService: UsersService) 
	{

		this.usernameForm = this.formBuilder.group({
			newUsername : [''] // add authentication
		});

		this.picForm = this.formBuilder.group({
			newPicURL: [''] // add authentication
		});
	};
	
	onToggleTwoFactorAuth(event: Event): void {
		const target = event.target as HTMLInputElement;
  		const isChecked = target.checked;

		if (isChecked) {
			this.twoFactorAuthQR = 'https://i.stack.imgur.com/kbOO8.png'; // placeholder, retrieve it from backend
			this.auth.change2faStatus();
			this.showModal2FA = true;
  		} else {
    		this.auth.change2faStatus();
			this.showModal2FA = false;
  		}
	}
	
	// on send forms
  
  	onClickEditUsername() : void {
		const newUsername: string = this.usernameForm.get('newUsername')?.value;
		
		console.log('edit username : link not implemented');
		this.closeModalUsername();

		//this.usersService.modifyUsernameToRegisteredUser(newUsername);
  	}

	onClickEditPic() : void {
		const newProfilePicURL: string = this.picForm.get('newPicURL')?.value;
		
		console.log('edit profile pic : link implemented');
		this.closeModalPic();

		//this.usersService.modifyProfilePictureToRegisteredUser(newProfilePicURL);
  	}

	// modal functions

	openModalPic() : void {
		this.showModalPic = true;
	}

	closeModalPic() : void {
		this.showModalPic = false;
	}

	openModalUsername() : void {
		this.showModalUsername = true;
	}

	closeModalUsername() : void {
		this.showModalUsername = false;
	}

	closeModal2FA(): void {
		this.showModal2FA = false;
	}
}
