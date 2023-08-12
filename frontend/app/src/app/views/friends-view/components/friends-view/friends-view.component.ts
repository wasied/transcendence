import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FriendsHandlerComponent } from '../friends-handler/friends-handler.component';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { FriendService } from 'src/app/core/services/friends.service';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
  selector: 'app-friends-view',
  templateUrl: './friends-view.component.html',
  styleUrls: ['./friends-view.component.css']
})
export class FriendsViewComponent implements OnInit, OnDestroy {
	
	@ViewChild(FriendsHandlerComponent) friendHandler!: FriendsHandlerComponent;
	
	newFriendForm!: FormGroup;
	modalIsOpen: boolean = false;
	users: User[] = [];
	private subscription!: Subscription;

	constructor(
		private usersService: UsersService,
		private friendService: FriendService
	) {};

	ngOnInit(): void {
		this.subscription = this.friendService.getNonFriends().subscribe(
			data => { this.users = data; },
			httpErrorHandler
		);
	}

	fillForm(user: User) { // triggers 
		this.friendHandler.setUser(user);
		this.closeModal();
	}

	onCreateNewFriendship() : void {
		this.openModal();		
	}

	openModal() : void {
		this.modalIsOpen = true;
	}

	closeModal() : void {
		this.modalIsOpen = false;
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
