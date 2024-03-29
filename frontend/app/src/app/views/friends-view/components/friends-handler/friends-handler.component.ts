import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { FriendService } from 'src/app/core/services/friends.service';
import { httpErrorHandler } from 'src/app/http-error-handler';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-friends-handler',
	template: ''})
export class FriendsHandlerComponent implements OnInit, OnDestroy {

	newFriendForm!: FormGroup;
	subscription!: Subscription;
	
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
		const userId = this.newFriendForm.get('userId')?.value;
		if (!userId)
			return ;
		this.subscription = this.friendsService.addAsFriend(+userId).subscribe(
			data => {},
			httpErrorHandler
		);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
