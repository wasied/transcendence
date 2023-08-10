import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { FriendService } from 'src/app/core/services/friends.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

	@Input() userId!: number;
	friends$!: Observable<User[]>;

	constructor (private friendsService: FriendService, private usersService: UsersService) {};
  
	ngOnInit(): void {
		this.friends$ = this.loadFriendsOfUser();
	}

	loadFriendsOfUser() : Observable<User[]> {
		return this.usersService.getHardcodedUsers();
		// return this.friendsService.getMyFriends();
	}
}
