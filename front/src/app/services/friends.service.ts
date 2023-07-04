import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, map, switchMap } from "rxjs";
import { Friend } from "../models/friend.model";


@Injectable({
	providedIn: 'root'
})
export class FriendService
{

	constructor (private http : HttpClient) {};

	private apiURL : string = 'http://localhost:3000/'; // modify this

	returnNewId() : Observable<number> {
		return this.getAllFriends().pipe(
			map(friends => {
				const maxId = Math.max(...friends.map(friend => friend.id));
				const newId = maxId + 1;
				return newId;
			})
		);
	}

	// addNewFriend(form: FormGroup) : Observable<Friend> {
		
	// 	const friendUsername: string = form.get('friendUsername')?.value;

	// 	return this.returnNewId().pipe(
	// 		switchMap(newId => {
	// 			const NewFriend: Friend = {
	// 				id: newId,
	// 				userId: ,
	// 				friendId: ,
	// 				friendName: ,
	// 				friendStatus: ,
	// 				createdAt: new Date()
	// 			};
	// 			return this.http.post<>();
	// 		})	
	// 	);
	// }

	getFriendById(id: number) : Observable<Friend> {
		return this.http.get<Friend>(`${this.apiURL}/${id}`);
	}

	getAllFriends() : Observable<Friend[]> {
		return this.http.get<Friend[]>(`${this.apiURL}`);
	}

	delFriend(id: number) : Observable<void> {
		return this.http.delete<void>(`${this.apiURL}/${id}`);
	}
}
