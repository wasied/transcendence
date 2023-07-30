import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Friend } from "../models/friend.model";
import { UsersService } from "./users.service";


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


	// with observables
	
	private apiURL : string = 'http://localhost:3000/friends';

	getFriendById(id: number) : Observable<Friend> {
		return this.http.get<Friend>(`${this.apiURL}/${id}`);
	}

	getFriendByUsername(username: string) : Observable<Friend> {
		return this.http.get<Friend>(`${this.apiURL}?username=${username}`);
	}

	getAllFriends() : Observable<Friend[]> {
		return this.http.get<Friend[]>(`${this.apiURL}`);
	}

	delFriend(id: number) : Observable<void> {
		return this.http.delete<void>(`${this.apiURL}/${id}`);
	}

	// api from backend should be able to retrieve all friends of a given user, identified by it's id
	getFriendsByUserId(userId: number) : Observable<Friend[]> {
		return this.http.get<Friend[]>(`${this.apiURL}`); // modify that
	}
}
