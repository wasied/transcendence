import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Chatroom } from '../models/chatroom.model'; 

@Injectable({
	providedIn: 'root'
})
export class ChatroomsService {

	constructor (private http: HttpClient) {};

	private hardcodedChatrooms: Chatroom[] = [
		{
			id: 1,
			chatroomName: 'testChatroom',
			ownerId: 1,
			owner: 'test3',
			accessStatus: 'public',
			participants: ['test', 'player'],
			participantsId: [1]
		},
		{
			id: 2,
			chatroomName: 'testChatroom',
			ownerId: 1,
			owner: 'test2',
			accessStatus: 'public',
			participants: ['test', 'player'],
			participantsId: [1]
		},
		{
			id: 2,
			chatroomName: 'testChatroom',
			ownerId: 1,
			owner: 'test3',
			accessStatus: 'public',
			participants: ['test', 'player'],
			participantsId: [1]
		}
	];

	getHardcodedChatrooms() : Observable<Chatroom[]> {
		return of(this.hardcodedChatrooms);
	}

	getHarcodedChatroomById(id: number) : Observable<Chatroom> {
		return of(this.hardcodedChatrooms[id - 1]);
	}

	// with DB

	private apiURL: string = 'http://localhost:3000/chatrooms'; // change that

	/* CREATE */
	
	// back end should be able to retrieve id of owner and participants, and attribute a new id 
	createChatroom(newName: string, newOwnerId: number, 
		newAccesStatus: string, newPassword: string) : Observable<Chatroom> {
		
		const endpoint: string = `${this.apiURL}`; // modify this
		const body = {
			action: 'createChatroom',
			chatroonName: newName,
			owner: newOwnerId,
			accessStatus: newAccesStatus,
			password: newPassword
		};
		return this.http.post<Chatroom>(endpoint, body);
	}

	/* READ */

	// get all chatrooms from the DB
	getAllChatrooms() : Observable<Chatroom[]> {
		const endpoint: string = `${this.apiURL}`; // modify this
		
		return this.http.get<Chatroom[]>(endpoint);
	}

	// get a chatroom based on the chatroom's id
	getChatroomByID(id: number) : Observable<Chatroom> { // probably not that useful
		const endpoint: string = `${this.apiURL}/${id}`; // modify this
		
		return this.http.get<Chatroom>(endpoint);
	}

	/* UPDATE */

	addParticipantToChatroom(chatroomiId: number, participantId: number) : Observable<Chatroom> {
		const body = {
			action: 'addParticipantToChatroom',
			chatroomiId: chatroomiId,
			participantId: participantId
		}
		const endpoint: string = `${this.apiURL}/${chatroomiId}`; // modify that

		return this.http.put<Chatroom>(endpoint, body);
	}

	kickUserFromChatroom(chatroomId: number, userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}`; // modify this
		const body = {
			action: 'kick',
			chatroomId: chatroomId,
			userId: userId
		};
		return this.http.put<void>(endpoint, body);
	}

	banUserFromChatroom(chatroomId: number, userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}`; // modify this
		const body = {
			action: 'ban',
			chatroomId: chatroomId,
			userId: userId
		};
		return this.http.put<void>(endpoint, body);
	}

	muteUserFromChatroom(chatroomId: number, userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}`; // modify this
		const body = {
			action: 'mute',
			chatroomId: chatroomId,
			userId: userId
		};
		return this.http.put<void>(endpoint, body);
	}

	makeUserAnAdmin(chatroomId: number, userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}`; // modify this
		const body = {
			action: 'makeAdmin',
			chatroomId: chatroomId,
			userId: userId
		};
		return this.http.put<void>(endpoint, body);
	}

	makeUserANonAdmin(chatroomId: number, userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}`; // modify this
		const body = {
			action: 'makeNonAdmin',
			chatroomId: chatroomId,
			userId: userId
		};
		return this.http.put<void>(endpoint, body);
	}

	modifyChatroomName(chatroomId: number, newName: string) : Observable<Chatroom> {
		const body = {
			action: 'modifyChatroomName',
			chatroomId: chatroomId,
			newName: newName
		};
		const endpoint: string = `${this.apiURL}/${chatroomId}`; // modify that
		
		return this.http.put<Chatroom>(endpoint, body);
	}

	modifyChatroomAccessRights(chatroomId: number, newAccessRights: string) : Observable<Chatroom> {
		const body = {
			action: 'modifyAccessRights',
			newAccessRights: newAccessRights,
			chatroomId: chatroomId
		}
		const endpoint: string = `${this.apiURL}/${chatroomId}`; // modify that
		
		return this.http.put<Chatroom>(endpoint, body);
	}

	/* DELETE */

	delChatroom(id: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/${id}`; // modify this
		
		return this.http.delete<void>(endpoint);
	}

	delParticipantFromChatroom(chatroomId: number, participantId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/${participantId}`; // modify that
		
		return this.http.delete<void>(endpoint);
	}
}
