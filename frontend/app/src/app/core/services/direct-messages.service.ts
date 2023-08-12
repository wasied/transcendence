import { AuthHttpClient } from 'src/app/auth-http-client';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Chatroom } from "../models/chatroom.model";
import { UsersService } from './users.service';
import { httpErrorHandler } from 'src/app/http-error-handler';
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})
export class DirectMessagesService {

	constructor (
		private authHttp: AuthHttpClient,
		private usersService: UsersService
	) {};

	private hardcodedDirectMessages: Chatroom[] = [
/*
		{
			id: 1,
			otherPlayerId: 1,
			otherPlayerPseudo: 'test other player',
			otherPlayerStatus: 'online'
		}
*/
	];

	gethardcodedDirectMessages() : Observable<Chatroom[]> {
		return of(this.hardcodedDirectMessages);
	}

	getHardcodedDirectMessageById(id: number) : Observable<Chatroom> {
		return of(this.hardcodedDirectMessages[id - 1]);
	}

	// with observables

	private apiURL : string = `${environment.appUrl}:${environment.backendAPIPort}/chat`;


	/* CREATE */

	createDMsession(otherUserId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}`;
		const body = {
			name: "direct message",
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
