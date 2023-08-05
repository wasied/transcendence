import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model"; 
import { Observable, of, map, switchMap, forkJoin } from 'rxjs';

@Injectable ({
	providedIn: 'root'
})
export class UsersService {

	constructor(private http: HttpClient) {};

	private harcodedUsers: User[]  = [{
		id: 1,
		username: 'testUser',
		password: '123456',
		profileImageURL: '/Users/corentin/code/19/transcendence/front/src/assets/imgs/picture-profile-empty.jpg',
		phoneNumber: '0987654321',
		updatedAt: new Date(),
		createdAt: new Date()
	}];

	private apiURL: string = 'http://localhost:3000/users'; // change that in final product
	private currentUserId: number = -1; // change this

	getHardcodedUsers() : Observable<User[]> {
		return of(this.harcodedUsers);
	}

	retrieveHardcodedUser() : Observable<User> { // change this after auth service is implemented
		this.storeUserId(this.harcodedUsers[0].id);
		return of(this.harcodedUsers[0]);
	}
	
	// with observables

	/* CREATE */

	giveUsernameToRegisteredUser(username: string) : Observable<void> {
		const endpoint: string =  `${this.apiURL}`; // modify this
		const body = {
			action: 'giveUsernameToUser',
			username: username
			// add  user id stored in localStorage
		};

		return this.http.post<void>(endpoint, body);
	}

	/* READ */

	getAllUsers() : Observable<User[]> {
		const endpoint: string = `${this.apiURL}`; // modify this
		
		return this.http.get<User[]>(endpoint);
	}

	getUserById(id: number) : Observable<User> {
		const endpoint: string = `${this.apiURL}/${id}`;
		
		return this.http.get<User>(endpoint);
	}

	getUsersAfterPlayingGame(idLeftPlayer: number, idRightPlayer: number) : Observable<User[]> {
		const user1$ = this.getUserById(idLeftPlayer);
  		const user2$ = this.getUserById(idRightPlayer);
		
		return forkJoin([user1$, user2$]);
	}

	// should be used for displaying users actually playing pong !
	getUsersInActiveSession() : Observable<User[]> {
		const endpoint: string = `${this.apiURL}/active`;
		
		return this.http.get<User[]>(endpoint);
	}

	// should be used to display game history (all players that have played against a given user)
	getUsersHavingPlayedWithGivenUser(userId: number) : Observable<User[]> {
		const endpoint: string = `${this.apiURL}`; // modify this
		
		return this.http.get<User[]>(endpoint);
	}

	/* UPDATE */

	modifyUsernameToRegisteredUser(username: string) : Observable<void> {
		const endpoint: string =  `${this.apiURL}`; // modify this
		const body = {
			action: 'giveUsernameToUser',
			username: username
			// add  user id stored in localStorage
		};

		return this.http.put<void>(endpoint, body);
	}

	modifyProfilePictureToRegisteredUser(imageURL: string) : Observable<void> {
		const endpoint: string = `${this.apiURL}`; // modify this
		const body = {
			action: 'changeProfilePic',
			imageURL: imageURL
			// add  user id stored in localStorage
		};

		return this.http.put<void>(endpoint, body);
	}

	// suppress that and replace it with localStorage
	
	storeUserId(id: number) : void {		
		this.currentUserId = id;
	}

	delUserId(id: number) : void {
		this.currentUserId = -1;
	}

	getCurrentUserId() : number {
		return this.currentUserId;
	}
}
