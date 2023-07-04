import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Chatroom } from "../models/chatroom.model";

@Injectable({
	providedIn: 'root'
})
export class ChatroomsService {

	constructor (private http: HttpClient) {};

	private apiURL: string = ''; // change that

	returnNewId() : Observable<number> {
		return this.getAllChatrooms().pipe(
			map(chatrooms => {
				const maxId = Math.max(...chatrooms.map(chatroom => chatroom.id));
				const newId = maxId + 1;
				return newId;
			})
		);
	}

	getChatroomByID(id: number) : Observable<Chatroom> {
		return this.http.get<Chatroom>(`${this.apiURL}/${id}`);
	}

	getAllChatrooms() : Observable<Chatroom[]> {
		return this.http.get<Chatroom[]>(`${this.apiURL}`);
	}
}
