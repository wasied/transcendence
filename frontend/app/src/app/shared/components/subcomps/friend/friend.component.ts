import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { FriendService } from 'src/app/core/services/friends.service';
import { httpErrorHandler } from 'src/app/http-error-handler';

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
		this.router.navigateByUrl(`main/game?spectator=true&user_id=${friendId}`);
	}

	async blockUserFromFriendsInterface(friendId: number) : Promise<void> {
		await this.usersService.blockUser(friendId).toPromise()
			.catch(err => { httpErrorHandler(err); });
	}
}
