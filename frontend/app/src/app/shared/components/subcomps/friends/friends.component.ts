import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { FriendService } from 'src/app/core/services/friends.service';
import { GlobalWebsocketService } from 'src/app/core/services/global-websocket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

	@Input() userId!: number;
	friends!: User[];

	constructor (
		private friendsService: FriendService,
		private globalWebsocketService: GlobalWebsocketService
	) {};
  
	ngOnInit(): void {
		this.globalWebsocketService.listenToServerEvents();
		this.globalWebsocketService.updateFriends$.subscribe(friends => { this.friends = friends; });
		this.globalWebsocketService.updateFriends();
	}

	loadFriendsOfUser() : Observable<User[]> {
		return this.friendsService.getMyFriends();
	}
}
