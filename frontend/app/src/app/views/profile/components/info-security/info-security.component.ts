import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UsersService } from '../../../../core/services/users.service';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-info-security',
	templateUrl: './info-security.component.html'
})
export class InfoSecurityComponent implements OnInit {

	@Input() A2FKey!: string;

	picForm!: FormGroup;
	usernameForm!: FormGroup;
	
	showModalUsername: boolean = false;
	showModalPic: boolean = false;
	showModal2FA: boolean = false;
	A2FEnabled!: boolean;

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
	
	ngOnInit(): void {
		this.A2FEnabled = this.A2FKey !== null;
	}

	async onToggleTwoFactorAuth(event: Event): Promise<void> {
		const target = event.target as HTMLInputElement;
  		const isChecked = target.checked;

		if (isChecked) {
			await this.auth.enable2faStatus()
				.then(value => {
					if (!value.success)
						return ;
					if (value.qrCodeUrl)
						this.twoFactorAuthQR = value.qrCodeUrl;
					else
						this.twoFactorAuthQR = "";
				});
			this.showModal2FA = true;
  		} else {
			await this.auth.disable2faStatus();
			this.showModal2FA = false;
  		}
	}
	
	// on send forms
  
  	onClickEditUsername() : void {
		const newUsername: string = this.usernameForm.get('newUsername')?.value;
		
		this.closeModalUsername();

		this.usersService.modifyUsernameToRegisteredUser(newUsername).subscribe(
			data => {},
			httpErrorHandler
		);
  	}

	onClickEditPic() : void {
		const newProfilePicURL: string = this.picForm.get('newPicURL')?.value;
		
		this.closeModalPic();

		this.usersService.modifyProfilePictureToRegisteredUser(newProfilePicURL).subscribe(
			data => {},
			httpErrorHandler
		);
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
