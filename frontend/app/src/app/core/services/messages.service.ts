import { Injectable } from "@angular/core";
import { Message } from "../models/message.model";
import { Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MessagesService {

	constructor (private http: HttpClient) {};

	private hardcodedMessages: Message[] = [
		{
			content: 'lorem ipsum',
			timestamp: new Date(),
			chatroomUserUid: 1
		},
		{
			content: 'lorem ipsum 2',
			timestamp: new Date(),
			chatroomUserUid: 2
		}
	]

	getAllHardcodedMessages() : Observable<Message[]> {
		return of(this.hardcodedMessages);
	}

	private apiUrl: string = 'http://localhost:3000/messages'; // change this

	// real stuff to do with websockets
	/* CREATE */

	sendMessageToDB(content: string, timestamp: Date, chatroomUserId: number) : Observable<void> {
		const endpoint: string = `${this.apiUrl}`; // modify that
		const body = {
			action: 'sendMessageToDB',
			content: content,
			timestamp: timestamp,
			chatroomUserId: chatroomUserId
		}
		return this.http.post<void>(endpoint, body);
	}

	/* READ */

	// will use the websocket
}
