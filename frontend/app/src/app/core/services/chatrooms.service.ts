import { Injectable } from "@angular/core";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { Observable, of } from "rxjs";
import { Chatroom } from '../models/chatroom.model'; 

@Injectable({
	providedIn: 'root'
})
export class ChatroomsService {

	constructor (private authHttp: AuthHttpClient) {};

	private hardcodedChatrooms: Chatroom[] = [
		{
			id: 1,
			name: 'test_1',
			owner_uid: 1,
			owner: 'random_guy',
			hidden: false,
			password: "",
			participants: ['test', 'player'],
			participants_id: [1]
		},
		{
			id: 2,
			name: 'testChatroom',
			owner_uid: 1,
			owner: 'test2',
			hidden: false,
			password: "",
			participants: ['test', 'player'],
			participants_id: [1]
		},
		{
			id: 2,
			name: 'testChatroom',
			owner_uid: 1,
			owner: 'test3',
			hidden: false,
			password: "",
			participants: ['test', 'player'],
			participants_id: [1]
		}
	];

	getHardcodedChatrooms() : Observable<Chatroom[]> {
		return of(this.hardcodedChatrooms);
	}

	getHarcodedChatroomById(id: number) : Observable<Chatroom> {
		return of(this.hardcodedChatrooms[id - 1]);
	}

	// with DB

	private apiURL: string = 'http://localhost:8080/chat';

	/**
	*** Chatrooms
	**/

	/* CREATE */
	
	createChatroom(newName: string, 
		hidden: boolean, newPassword: string) : Observable<void> {
		
		const endpoint: string = `${this.apiURL}`;
		const body = {
			name: newName,
			hidden:	hidden,
			password: newPassword
		};
		return this.authHttp.post<void>(endpoint, body);
	}

	/* READ */

	getAllChatrooms() : Observable<Chatroom[]> {
		const endpoint: string = `${this.apiURL}`;
		
		return this.authHttp.get<Chatroom[]>(endpoint);
	}

	getChatroomByID(id: number) : Observable<Chatroom> { // probably not that useful
		const endpoint: string = `${this.apiURL}/${id}`;
		
		return this.authHttp.get<Chatroom>(endpoint);
	}

	// canUserCoerce(participantsId: number[]) : Observable<number[]> {
	// 	const endpoint: string = `${this.apiURL}`; // modify this

	// 	return this.http.post<number[]>(endpoint, body);
	// } 

	/* UPDATE */

/*
	modifyChatroomName(chatroomId: number, newName: string) : Observable<Chatroom> {
		const body = {
			action: 'modifyChatroomName',
			chatroomId: chatroomId,
			newName: newName
		};
		const endpoint: string = `${this.apiURL}/${chatroomId}`; // modify that
		
		return this.authHttp.put<Chatroom>(endpoint, body);
	}
*/

	modifyChatroomAccessRights(chatroomId: number, hidden: boolean) : Observable<Chatroom> {
		const body = {
			hidden: hidden,
			chatroom_id: chatroomId
		}
		const endpoint: string = `${this.apiURL}/hidden`;
		
		return this.authHttp.put<Chatroom>(endpoint, body);
	}

	// modifyChatroomAccessRights(chatroomId: number, newAccessRights: string, newPassord: string | null) : Observable<void> {
	// 	const body = {
	// 		action: 'modifyAccessRights',
	// 		newAccessRights: newAccessRights,
	// 		chatroomId: chatroomId,
	// 		newPassord: newPassord
	// 	}
	// 	const endpoint: string = `${this.apiURL}/${chatroomId}`; // modify that
		
	// 	return this.authHttp.put<void>(endpoint, body);
	// }

	/* DELETE */

	delChatroom(id: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/${id}`;
		
		return this.authHttp.delete<void>(endpoint);
	}

	/**
	*** Chatroom_users
	**/

	/* CREATE */

	addParticipantToChatroom(chatroomId: number, participantId: number) : Observable<Chatroom> {
		const body = {
			id: chatroomId
		};
		const endpoint: string = `${this.apiURL}/join`;

		return this.authHttp.post<Chatroom>(endpoint, body);
	}

	/* UPDATE */

	makeUserAnAdmin(chatroomId: number, userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/admin`;
		const body = {
			admin: true,
			id: chatroomId,
			user_id: userId
		};
		return this.authHttp.put<void>(endpoint, body);
	}

	makeUserANonAdmin(chatroomId: number, userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/admin`;
		const body = {
			admin: false,
			id: chatroomId,
			user_id: userId
		};
		return this.authHttp.put<void>(endpoint, body);
	}

	/* DELETE */

	delParticipantFromChatroom(chatroomId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/leave/${chatroomId}`;
		
		return this.authHttp.delete<void>(endpoint);
	}

	modifyChatroomPassword(chatroomId: number, oldPassword: string, newPassword: string) : Observable<void> {
		const body = {
			action: 'modifyChatroomPassword',
			chatroomId: chatroomId,
			oldPassword: oldPassword,
			newPassword: newPassword
		}
		const endpoint: string = `${this.apiURL}/${chatroomId}`; // modify that

		return this.authHttp.put<void>(endpoint, body);
	}

	kickUserFromChatroom(chatroomId: number, userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/kick/${chatroomId}/${userId}`;

		return this.authHttp.delete<void>(endpoint);
	}

	/**
	*** Punishments
	**/
	
	/* CREATE */

	banUserFromChatroom(chatroomId: number, userId: number, endsAt: string) : Observable<void> {
		const endpoint: string = `${this.apiURL}/punishment`;
		const body = {
			type: 'ban',
			chatroom_id: chatroomId,
			target_id: userId,
			ends_at: endsAt
		};
		return this.authHttp.post<void>(endpoint, body);
	}

	muteUserFromChatroom(chatroomId: number, userId: number, endsAt: string) : Observable<void> {
		const endpoint: string = `${this.apiURL}/punishment`;
		const body = {
			type: 'mute',
			chatroom_id: chatroomId,
			target_id: userId,
			ends_at: endsAt
		};
		return this.authHttp.post<void>(endpoint, body);
	}
}
