import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Friend } from 'src/app/core/models/friend.model'; 
import { FriendService } from 'src/app/core/services/friends.service'; 
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FriendsHandlerComponent } from '../friends-handler/friends-handler.component';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

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

	constructor(private usersService: UsersService) {};

	ngOnInit(): void {
		this.subscription = this.usersService.getHardcodedUsers().subscribe(data => { // change hardoded users
			this.users = data;
		});
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
