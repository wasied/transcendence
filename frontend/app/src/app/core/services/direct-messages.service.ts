import { AuthHttpClient } from 'src/app/auth-http-client';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Chatroom } from "../models/chatroom.model";
import { UsersService } from './users.service';
import { httpErrorHandler } from 'src/app/http-error-handler';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class DirectMessagesService {

	constructor (
		private authHttp: AuthHttpClient,
		private usersService: UsersService
	) {};

	private hardcodedUser: User = {
		id: 1,
		username: 'truc',
		status: 'online',
		a2f_key: '',
		profile_picture_url: '',
		updated_at: '',
		created_at: ''
	}

	private hardcodedDirectMessages: Chatroom[] = [
		{
	
				id: 1,
				name: 'test_1',
				owner_uid: 1,
				owner: this.hardcodedUser,
				password: null,
				direct_message: false,
				participants: [this.hardcodedUser, this.hardcodedUser],
				participants_id: [1]

		}
	];

	gethardcodedDirectMessages() : Observable<Chatroom[]> {
		return of(this.hardcodedDirectMessages);
	}

	getHardcodedDirectMessageById(id: number) : Observable<Chatroom> {
		return of(this.hardcodedDirectMessages[id - 1]);
	}

	// with observables

	private apiURL : string = 'http://localhost:8080/chat';


	/* CREATE */

	createDMsession(otherUserId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}`;
		const myUsername = this.usersService.getMe().toPromise()
			.then(result => {
				if (!result)
					return null;
				return result.username;
			})
			.catch(error => {
				httpErrorHandler(error);
				return null;
			});
		const otherUserUsername = this.usersService.getUserById(otherUserId).toPromise()
			.then(result => {
				if (!result)
					return null;
				return result.username;
			})
			.catch(error => {
				httpErrorHandler(error);
				return null;
			});
		if (!myUsername || !otherUserUsername)
			return of(void 0);
		const body = {
			name: `${myUsername} - ${otherUserUsername}`,
			password: null,
			direct_message: true,
			other_user_id: otherUserId
		};

		return this.authHttp.post<void>(endpoint, body);
	}

	/* READ */

	getDirectMsgById(id : number) : Observable<Chatroom> {
		const endpoint: string = `${this.apiURL}/${id}`;
		
		return this.authHttp.get<Chatroom>(endpoint);
	}

	getMyDirectMsgs() : Observable<Chatroom[]> {
		const endpoint: string = `${this.apiURL}/my-direct-messages`;
		
		return this.authHttp.get<Chatroom[]>(endpoint);
	}

	/* UPDATE */

	blockDirectMsgUser(id: number) : Observable<void> {
		return this.usersService.blockUser(id);
	}

	/* DELETE */

	delDirectMsg(id: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/${id}`;
		
		return this.authHttp.delete<void>(endpoint);
	}
}
