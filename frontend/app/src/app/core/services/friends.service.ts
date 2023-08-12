import { Injectable } from "@angular/core";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { Observable, of } from "rxjs";
import { Friend } from "../models/friend.model";
import { User } from '../models/user.model';
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class FriendService
{
	constructor (private authHttp : AuthHttpClient) {};

	private hardcodedFriends: Friend[] = [{
		id: 1,
		userId: 1,
		friendId: 2,
		friendName: 'test friend',
		friendStatus: 'online',
		createdAt: new Date()
	}];
	
	getHardcodedFriends() : Observable<Friend[]> {
		return of(this.hardcodedFriends);
	}

	// with DB
	
	private apiURL : string = `${environment.appUrl}:${environment.backendAPIPort}/friends`;

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

	getFriendshipById(id: number) : Observable<Friend> {
		const endpoint: string = `${this.apiURL}/friendship/${id}`;

		return this.authHttp.get<Friend>(endpoint);
	}

	/* DELETE */

	delFriend(friendshipId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/${friendshipId}`;
		
		return this.authHttp.delete<void>(endpoint);
	}
}
