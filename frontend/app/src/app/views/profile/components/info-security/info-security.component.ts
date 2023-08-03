import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
	selector: 'app-info-security',
	templateUrl: './info-security.component.html'
})
export class InfoSecurityComponent {

	passwordForm!: FormGroup;
	picForm!: FormGroup;
	telForm!: FormGroup;
	
	showModalPassword: boolean = false;
	showModalPic: boolean = false;
	showModalTel: boolean = false;
	showModal2FA: boolean = false;

	twoFactorAuthQR!: string;

	constructor (private formBuilder: FormBuilder, private auth: AuthenticationService) {
		this.passwordForm = this.formBuilder.group({
			oldPassword: [''],
			newPassword: [''],
			newPassword2: ['']
		});

		this.picForm = this.formBuilder.group({
			newPicURL: ['']
		});

		this.telForm = this.formBuilder.group({
			newPhone : ['']
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
	onClickEditPassword() : void {
    	console.log('edit password : need to be implemented');
		this.closeModalPassword();
  	}

  	onClickEditPic() : void {
		console.log('edit profile pic : need to be implemented');
		this.closeModalPic();
  	}

  	onClickEditNumber() : void {
		console.log('edit number : need to be implemented');
		this.closeModalTel();
  	}

	// modal functions
	openModalPassword() : void {
		this.showModalPassword = true;
	}
	
	closeModalPassword() : void {
		this.showModalPassword = false;
	}

	openModalPic() : void {
		this.showModalPic = true;
	}

	closeModalPic() : void {
		this.showModalPic = false;
	}

	openModalTel() : void {
		this.showModalTel = true;
	}

	closeModalTel() : void {
		this.showModalTel = false;
	}

	closeModal2FA(): void {
		this.showModal2FA = false;
	}
}
