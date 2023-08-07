import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { FriendService } from 'src/app/core/services/friends.service';

@Component({
	selector: 'app-friends-handler',
	template: ''})
export class FriendsHandlerComponent implements OnInit {

	newFriendForm!: FormGroup;
	
	constructor(private fb: FormBuilder,
				private friendsService: FriendService) {}
	
	ngOnInit(): void {
		this.initForm();
	}

	private initForm() {
		this.newFriendForm = this.fb.group({
			userName: [''],
			userId: ['']
		});
	}

	setUser(user: User) {
		this.newFriendForm.patchValue({
		  	userName: user.username,
		  	userId: user.id
		});
		this.createNewFriendship();
	}

	private createNewFriendship() : void {
		this.friendsService.addAsFriend(this.newFriendForm.get('userId')?.value);
	}
}
