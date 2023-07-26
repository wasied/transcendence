import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Chatroom } from "../models/chatroom.model"; 

@Injectable({
	providedIn: 'root'
})
export class ChatroomsService {

	constructor (private http: HttpClient) {};

	private hardcodedChatrooms: Chatroom[] = [
		{
			id: 1,
			chatroomName: 'tstChatroom',
			ownerId: 1,
			owner: 'test player',
			accessStatus: 'public',
			participants: ['test ,player'],
			participantsId: [1]
		}
	];

	getHardcodedChatrooms() : Observable<Chatroom[]> {
		return of(this.hardcodedChatrooms);
	}

	
	// with observables

	private apiURL: string = 'http://localhost:3000/chatrooms'; // change that
	
	getChatroomByID(id: number) : Observable<Chatroom> {
		return this.http.get<Chatroom>(`${this.apiURL}/${id}`);
	}

	getAllChatrooms() : Observable<Chatroom[]> { // should be sufficient (need to display all chatrooms)
		return this.http.get<Chatroom[]>(`${this.apiURL}`);
	}

	// modify this later, the attribution of a new id should be handled by the back end
	// back end should be able to retrieve id of owner and participants, and attribute a new id to newly create chatroom
	createChatroom(newName: string, newOwner: string, newAccesStatus: string) : Observable<Chatroom> {
		return this.http.post<Chatroom>(`${this.apiURL}`, 
		{ chatroomName: newName, owner: newOwner, accesStatus: newAccesStatus });
	}

	delChatroom(id: number) : Observable<void> {
		return this.http.delete<void>(`${this.apiURL}/${id}`);
	}

	modifyChatroomName(chatroomId: number, newName: string) : Observable<Chatroom> {
		return this.http.put<Chatroom>(`${this.apiURL}/${chatroomId}`,
		{ chatroomName: newName });
	}

	modifyChatroomAccessRights(chatroomId: number, newAccessRights: string) : Observable<Chatroom> {
		return this.http.put<Chatroom>(`${this.apiURL}/${chatroomId}`,
		{ accessStatus: newAccessRights });
	}

	addParticipantToChatroom(chatroomiId: number, participantName: string) : Observable<Chatroom> {
		return this.http.put<Chatroom>(`${this.apiURL}/${chatroomiId}`, // change this
		{ participantName });
	}

	// should trigger the backend to destroy a participant from participants[], retrieving it's id using username
	delParticipantFromChatroom(participantName: string) : Observable<void> {
		return this.http.delete<void>(`${this.apiURL}/${participantName}`); // modify this
	}
}
