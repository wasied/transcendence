import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DirectMessagesWebsocketService } from 'src/app/core/services/direct-messages-websocket.service';
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
	
	constructor (
		private usersService: UsersService,
		private directMessagesWebsocketService: DirectMessagesWebsocketService
	)
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

	openModal() : void {
		this.isModalOpen = true;
	}

	closeModal() : void {
		this.isModalOpen = false;
	}

	// ngOnDestroy(): void {
	// 	if (this.subscription) {
	// 		this.subscription.unsubscribe();
	// 	}
	// }
}
