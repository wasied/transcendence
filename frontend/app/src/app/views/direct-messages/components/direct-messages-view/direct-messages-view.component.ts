import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { DirectMessagesService } from '../../../../core/services/direct-messages.service';
import { UsersService } from '../../../../core/services/users.service';
import { User } from 'src/app/core/models/user.model';
import { DmHandlerComponent } from '../dm-handler/dm-handler.component';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-direct-messages-view',
	templateUrl: './direct-messages-view.component.html',
	styleUrls: ['./direct-messages-view.component.css']
})
export class DirectMessagesViewComponent implements OnInit, OnDestroy {

	@ViewChild(DmHandlerComponent) dmHandler!: DmHandlerComponent;
	
	newDMForm!: FormGroup;
	isModalOpen: boolean = false;
	users: User[] = [];
	private subscription!: Subscription;
	
	constructor (private dmService: DirectMessagesService,
				 private usersService: UsersService,
				 private formBuilder: FormBuilder) 
	{};

	ngOnInit(): void {
		this.subscription = this.usersService.getAllUsersButMe().subscribe(
			data => {
				this.users = data;
			},
			httpErrorHandler
		);
	}

	fillForm(user: User) { // triggers 
		this.dmHandler.setUser(user);
		this.closeModal();
	}
	
	onClickOnCreateDMSession() : void {
		this.openModal();		
	}

	private triggerDMSessionCreation(otherUserId: number) : void {
		this.dmService.createDMsession(otherUserId).subscribe(
			data => {},
			httpErrorHandler
		);
	}

	openModal() : void {
		this.isModalOpen = true;
	}

	closeModal() : void {
		this.isModalOpen = false;
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
