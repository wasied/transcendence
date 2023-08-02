import { Component, OnInit, Input } from '@angular/core';
import { Friend } from 'src/app/core/models/friend.model'; 
import { FriendService } from 'src/app/core/services/friends.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

	@Input() userId!: number;
	friends$!: Observable<Friend[]>;

	constructor (private friendsService: FriendService) {};
  
	ngOnInit(): void {
		this.friends$ = this.loadFriends();
	}

	loadFriends() : Observable<Friend[]> {
		return (this.friendsService.getHardcodedFriends()); // change the logic after
	}
}
