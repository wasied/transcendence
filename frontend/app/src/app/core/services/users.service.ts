import { Injectable } from "@angular/core";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { User } from "../models/user.model"; 
import { Observable, of, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable ({
	providedIn: 'root'
})
export class UsersService {

	constructor(private authHttp: AuthHttpClient) {};

	
	private apiURL: string = `${environment.appUrl}:${environment.backendAPIPort}/users`;

	/* READ */

	getAllUsers() : Observable<User[]> {
		const endpoint: string = `${this.apiURL}`;

		return this.authHttp.get<User[]>(endpoint);
	}

	getAllUsersButMe() : Observable<User[]> {
		const endpoint: string = `${this.apiURL}/all-but-me`;

		return this.authHttp.get<User[]>(endpoint);
	}

	getMe() : Observable<User> {
		const endpoint: string = `${this.apiURL}/me`;

		return this.authHttp.get<User>(endpoint);
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

	getUsersInActiveSession() : Observable<User[]> {
		const endpoint: string = `${this.apiURL}/playing`;
		
		return this.authHttp.get<User[]>(endpoint);
	}

	// should be used to display game history (all players that have played against a given user)
	getUsersHavingPlayedWithGivenUser(userId: number) : Observable<User[]> {
		const endpoint: string = `${this.apiURL}`; // modify this
		
		return this.authHttp.get<User[]>(endpoint);
	}

/*
	isUserBlocked(userId: number) : Observable<boolean> {
		const endpoint: string = `${this.apiURL}`; // modify this

		return this.authHttp.get<boolean>(endpoint);
	}

	isUserOwnChatroom(chatroomId: number) : Observable<boolean> {
		const endpoint: string = `${this.apiURL}`; // modify this

		return this.authHttp.get<boolean>(endpoint);
	}
*/

	getPlayersAfterMatchmaking() : Observable<User[]> {
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

	blockUser(idOfBlockedUser: number) : Observable<void> {
		const endpoint: string =`${this.apiURL}/block`;
		const body = {
			blocked_uid: idOfBlockedUser
		};

		return this.authHttp.post<void>(endpoint, body);
	}

	unblockUser(idOfBlockedUser: number) : Observable<void> {
		const endpoint: string =`${this.apiURL}/unblock/${idOfBlockedUser}`;

		return this.authHttp.delete<void>(endpoint);
	}
}
