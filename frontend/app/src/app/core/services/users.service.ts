import { Injectable } from "@angular/core";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { User } from "../models/user.model"; 
import { Observable, of, map, switchMap, forkJoin } from 'rxjs';

@Injectable ({
	providedIn: 'root'
})
export class UsersService {

	constructor(private authHttp: AuthHttpClient) {};

	private harcodedUsers: User[]  = [{
		id: 1,
		username: 'testUser',
		status: "offline",
		a2f_key: "",
		profile_picture_url: '/Users/corentin/code/19/transcendence/front/src/assets/imgs/picture-profile-empty.jpg',
		updated_at: "",
		created_at: ""
	}];

	private apiURL: string = 'http://localhost:8080/users'; // change that in final product
	private currentUserId: number = -1; // change this

	getHardcodedUsers() : Observable<User[]> {
		return of(this.harcodedUsers);
	}

	retrieveHardcodedUser() : Observable<User> { // change this after auth service is implemented
		this.storeUserId(this.harcodedUsers[0].id);
		return of(this.harcodedUsers[0]);
	}
	
	// with observables

	/* READ */

	getAllUsers() : Observable<User[]> {
		const endpoint: string = `${this.apiURL}`;
		
		return this.authHttp.get<User[]>(endpoint);
	}

	getUserById(id: number) : Observable<User> {
		const endpoint: string = `${this.apiURL}/${id}`;
		
		return this.authHttp.get<User>(endpoint);
	}

	getUsersAfterPlayingGame(idLeftPlayer: number, idRightPlayer: number) : Observable<User[]> {
		const user1$ = this.getUserById(idLeftPlayer);
  		const user2$ = this.getUserById(idRightPlayer);
		
		return forkJoin([user1$, user2$]);
	}

	// should be used for displaying users actually playing pong !
	getUsersInActiveSession() : Observable<User[]> {
		const endpoint: string = `${this.apiURL}/playing`;
		
		return this.authHttp.get<User[]>(endpoint);
	}

	// should be used to display game history (all players that have played against a given user)
	getUsersHavingPlayedWithGivenUser(userId: number) : Observable<User[]> {
		const endpoint: string = `${this.apiURL}`; // modify this
		
		return this.authHttp.get<User[]>(endpoint);
	}

	/* UPDATE */

	modifyUsernameToRegisteredUser(username: string) : Observable<void> {
		const endpoint: string =  `${this.apiURL}/username`;
		const body = {
			username: username
		};

		return this.authHttp.put<void>(endpoint, body);
	}

	modifyProfilePictureToRegisteredUser(imageURL: string) : Observable<void> {
		const endpoint: string = `${this.apiURL}/profile-picture`;
		const body = {
			url: imageURL
		};

		return this.authHttp.put<void>(endpoint, body);
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
