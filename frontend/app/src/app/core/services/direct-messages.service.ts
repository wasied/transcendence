import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DirectMessage } from "../models/direct-message.model"; 

@Injectable({
	providedIn: 'root'
})
export class DirectMessagesService {

	constructor (private http: HttpClient) {};

	private hardcodedDirectMessages: DirectMessage[] = [{
		id: 1,
		otherPlayerId: 1,
		otherPlayerPseudo: 'test other player',
		otherPlayerStatus: 'online'
	}];

	gethardcodedDirectMessages() : Observable<DirectMessage[]> {
		return of(this.hardcodedDirectMessages);
	}

	getHardcodedDirectMessageById(id: number) : Observable<DirectMessage> {
		return of(this.hardcodedDirectMessages[id - 1]);
	}

	// with observables

	private apiURL : string = 'http://localhost:3000/chatrooms_messages'; // add that


	/* CREATE */



	/* READ */

	getDirectMsgById(id : number) : Observable<DirectMessage> {
		const endpoint: string = `${this.apiURL}/${id}`; // modify this
		
		return this.http.get<DirectMessage>(endpoint);
	}

	getAllDirectMsgs() : Observable<DirectMessage[]> {
		const endpoint: string = `${this.apiURL}`; // modify this
		
		return this.http.get<DirectMessage[]>(endpoint);
	}

	/* UPDATE */

	blockDirectMsgUser(id: number) : Observable<void> { // finish this
		const endpoint: string = `${this.apiURL}/${id}`; // modify this
		const body = {
			action: ''
		};
		return this.http.put<void>(endpoint, body);
	}

	/* DELETE */

	delDirectMsg(id: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/${id}`; // modify this
		
		return this.http.delete<void>(endpoint);
	}
}
