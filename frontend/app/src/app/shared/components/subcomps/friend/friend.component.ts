import { Component, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-friend',
	templateUrl: './friend.component.html',
	styleUrls: ['./friend.component.css']
})
export class FriendComponent {
	
	@Input() friend!: User;

	constructor (private router: Router) {};

	goToVisitProfile(friendId: number) : void {
		this.router.navigate(['main', 'profile', friendId]);
	}

	triggerPongSpectator(friendId: number) : void {
		console.log('apply spectator');
	}

	blockUserFromFriendsInterface(friendId: number) : void {
		console.log('apply blocking');
	}
}
