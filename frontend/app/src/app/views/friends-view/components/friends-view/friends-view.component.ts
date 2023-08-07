import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/core/models/friend.model'; 
import { FriendService } from 'src/app/core/services/friends.service'; 
import { Observable } from 'rxjs';
import { AuthHttpClient } from 'src/app/auth-http-client';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
  selector: 'app-friends-view',
  templateUrl: './friends-view.component.html',
  styleUrls: ['./friends-view.component.css']
})
export class FriendsViewComponent {
  	friends: any[] = [{name: "test"}, {name: "test2", online:true}]; // Store the friends' data

	constructor (private authHttp: AuthHttpClient) {}

  	
	
	private apiURL : string = 'http://localhost:8080/friends';
  
  	ngOnInit(): void {
    	console.log('init');
		this.getFriends();
    }
  
	getFriends(): void {
		this.authHttp.get<any>(this.apiURL).subscribe(
			friends => { this.friends = friends; },
			httpErrorHandler
		);
  	}
}
