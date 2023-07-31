import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validator, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
	selector: 'app-info-security',
	templateUrl: './info-security.component.html'
})
export class InfoSecurityComponent {

	PasswordForm!: FormGroup;
	PicForm!: FormGroup;
	TelForm!: FormGroup;
	
	showModalPassword: boolean = false;
	showModalPic: boolean = false;
	showModalTel: boolean = false;

	constructor (private formBuilder: FormBuilder, private auth: AuthenticationService) {
		this.PasswordForm = this.formBuilder.group({
			oldPassword: ['', Validators.required],
			newPassword: ['', Validators.required],
			newPassword2: ['', Validators.required]
		});

		this.PicForm = this.formBuilder.group({
			newPicURL: ['', Validators.required]
		});

		this.TelForm = this.formBuilder.group({
			newPhone : ['', Validators.required]
		});
	};
	
	onToggleTwoFactorAuth(event: Event): void {
		const target = event.target as HTMLInputElement;
  		const isChecked = target.checked;

		if (isChecked) {
			this.auth.change2faStatus();
  		} else {
    		this.auth.change2faStatus();
  		}
	}
	
	onClickEditPassword() : void {
    	console.log('edit passwd : need to be implemented');
  	}

  	onClickEditPic() : void {
		console.log('edit profile pic : need to be implemented');
  	}

  	onClickEditNumber() : void {
		console.log('edit number : need to be implemented');
  	}

	// forms functions
	onSubmitNewPassword() : void {
		console.log('new password submitted : not implemented yet');
	}

	onSubmitNewPic() : void {
		console.log('new profile picture submitted : not implemented yet');
	}

	onSubmitNewPhone() : void {
		console.log('new phone submitted : not implemented yet');
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
}
