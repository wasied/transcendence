import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DirectMessagesService } from 'src/app/core/services/direct-messages.service';
import { User } from '../../../../core/models/user.model';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-dm-handler',
  	template: ''
})
export class DmHandlerComponent implements OnInit {

	newDmForm!: FormGroup;
	
	constructor(private fb: FormBuilder,
				private dmService: DirectMessagesService) {}
	
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
		// console.log("Form updated with:", this.newDmForm.value); // suppress in prod repo
		this.createNewDirectMessage();
	}

	private createNewDirectMessage() : void {
		this.dmService.createDMsession(this.newDmForm.get('userId')?.value).subscribe(
			data => {},
			httpErrorHandler
		);
	}
}
