import { Injectable } from "@angular/core";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { Observable } from "rxjs";
import { User } from '../models/user.model';


@Injectable({
	providedIn: 'root'
})
export class FriendService
{
	constructor (private authHttp : AuthHttpClient) {};
	
	private apiURL : string = 'http://localhost:8080/friends';

	/* CREATE */

	addAsFriend(userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}`;
		const body = {
			user_id: userId,
		};

		return this.authHttp.post<void>(endpoint, body);
	}

	/* READ */

	getAllFriends() : Observable<User[]> {
		const endpoint: string = `${this.apiURL}`;

		return this.authHttp.get<User[]>(endpoint);
	}

	getMyFriends() : Observable<User[]> {
		const endpoint: string = `${this.apiURL}`;

		return this.authHttp.get<User[]>(endpoint);
	}

	getFriendsByUserId(userId: number) : Observable<User[]> {
		const endpoint: string = `${this.apiURL}/${userId}`;

		return this.authHttp.get<User[]>(endpoint);
	}

	/* DELETE */

	delFriend(friendshipId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/${friendshipId}`;
		
		return this.authHttp.delete<void>(endpoint);
	}
}
