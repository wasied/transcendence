import { Injectable } from "@angular/core";
import { Message } from "../models/message.model";
import { Observable, of } from "rxjs";
import { AuthHttpClient } from 'src/app/auth-http-client';

@Injectable({
	providedIn: 'root'
})
export class MessagesService {

	constructor (private authHttp: AuthHttpClient) {};

	private hardcodedMessages: Message[] = [
		{
			id: 1,
			chatroom_user_uid: 1,
			content: 'lorem ipsum',
			created_at: new Date()
		},
		{
			id: 2,
			chatroom_user_uid: 2,
			content: 'lorem ipsum 2',
			created_at: new Date()
		}
	]

	getAllHardcodedMessages() : Observable<Message[]> {
		return of(this.hardcodedMessages);
	}

	private apiUrl: string = 'http://localhost:8080/messages';

	/* CREATE */

	sendMessageToDB(content: string, chatroomId: number) : Observable<void> {
		const endpoint: string = `${this.apiUrl}`;
		const body = {
			chatroom_id: chatroomId,
			content: content
		}

		return this.authHttp.post<void>(endpoint, body);
	}

	/* READ */

	getChatroomMessages(chatroomId: number): Observable<Message[]> {
		const endpoint: string = `${this.apiUrl}/${chatroomId}`;

		return this.authHttp.get<Message[]>(endpoint);
	}
}
