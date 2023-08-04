import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Friend } from "../models/friend.model";


@Injectable({
	providedIn: 'root'
})
export class FriendService
{
	constructor (private http : HttpClient) {};

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
	
	private apiURL : string = 'http://localhost:3000/friends';

	/* CREATE */

	addAsFriend(userId: number, friendId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}`; // modify that
		const body = {
			action: 'asfriend',
			userId: userId,
			friendId: friendId
		};

		return this.http.post<void>(endpoint, body);
	}

	/* READ */

	// retrieve all friends
	getAllFriends() : Observable<Friend[]> {
		const endpoint: string = `${this.apiURL}`; // modify that
		
		return this.http.get<Friend[]>(endpoint);
	}

	// returns a friend by its id
	getFriendById(id: number) : Observable<Friend> {
		const endpoint: string = `${this.apiURL}`; // modify that

		return this.http.get<Friend>(endpoint);
	}

	// retrieve all friends of a given user, identified by it's id
	getFriendsByUserId(userId: number) : Observable<Friend[]> {
		const endpoint: string = `${this.apiURL}`; // modify that

		return this.http.get<Friend[]>(endpoint);
	}

	/* DELETE */

	// delete a friend, using the friends id and the user id
	delFriend(UserId: number, FriendId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}`; // modify that
		
		return this.http.delete<void>(endpoint);
	}
}
