import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { FriendService } from '../../../../core/services/friends.service';

@Component({
	selector: 'app-friend',
	templateUrl: './friend.component.html',
	styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
	
	@Input() friend!: User;

	constructor (private router: Router, 
				 private usersService: UsersService,
				 private friendService: FriendService) {};

	goToVisitProfile(friendId: number) : void {
		this.router.navigate(['main', 'profile', friendId]);
	}

	ngOnInit(): void {
	}

	triggerPongSpectator(friendId: number) : void {
		console.log('apply spectator');
		 
	}

	blockUserFromFriendsInterface(friendId: number) : void {
		this.usersService.blockUser(friendId);
	}
}
