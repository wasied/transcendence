import { Injectable } from "@angular/core";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { Observable, of } from "rxjs";
import { Chatroom } from '../models/chatroom.model'; 
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ChatroomsService {

	constructor (private authHttp: AuthHttpClient) {};

	readonly id: number;
	readonly username: string;
	status: string;
	a2f_key: string;
	profile_picture_url: string;
	readonly updated_at: string;
	readonly created_at: string;


	private apiURL: string = `${environment.appUrl}:${environment.backendAPIPort}/chat`;

	/**
	*** Chatrooms
	**/

	/* CREATE */
	
/*

	createChatroom(newName: string, newPassword: string | null) : Observable<void> {
		
		const endpoint: string = `${this.apiURL}`;
		const body = {
			name: newName,
			password: newPassword,
			direct_message: false,
			other_user_id: 0
		};
		return this.authHttp.post<void>(endpoint, body);
	}

*/

	/* READ */

/*

	getAllChatrooms() : Observable<Chatroom[]> {
		const endpoint: string = `${this.apiURL}/chatrooms`;
		
		return this.authHttp.get<Chatroom[]>(endpoint);
	}

	getMyChatrooms() : Observable<Chatroom[]> {
		const endpoint: string = `${this.apiURL}/my-chatrooms`;

		return this.authHttp.get<Chatroom[]>(endpoint);
	}

*/


	getChatroomByID(id: number) : Observable<Chatroom> {
		const endpoint: string = `${this.apiURL}/${id}`;
		
		return this.authHttp.get<Chatroom>(endpoint);
	}

	amIChatroomOwner(chatroomId: number): Observable<boolean> {
		const endpoint: string = `${this.apiURL}/is-owner/${chatroomId}`;

		return this.authHttp.get<boolean>(endpoint);
	}

	/* UPDATE */

	modifyChatroomAccessRights(chatroomId: number, hidden: boolean) : Observable<Chatroom> {
		const body = {
			hidden: hidden,
			chatroom_id: chatroomId
		}
		const endpoint: string = `${this.apiURL}/hidden`;
		
		return this.authHttp.put<Chatroom>(endpoint, body);
	}

	/* DELETE */

/*

	delChatroom(id: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/${id}`;
		
		return this.authHttp.delete<void>(endpoint);
	}

*/

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
			chatroom_id: chatroomId,
			user_id: userId
		};
		return this.authHttp.put<void>(endpoint, body);
	}

	makeUserANonAdmin(chatroomId: number, userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/admin`;
		const body = {
			admin: false,
			chatroom_id: chatroomId,
			user_id: userId
		};
		return this.authHttp.put<void>(endpoint, body);
	}

	delParticipantFromChatroom(chatroomId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/leave/${chatroomId}`;
		
		return this.authHttp.delete<void>(endpoint);
	}

	modifyChatroomPassword(chatroomId: number, newPassword: string | null) : Observable<void> {
		const body = {
			id: chatroomId,
			password: newPassword
		}
		const endpoint: string = `${this.apiURL}/password`;

		return this.authHttp.put<void>(endpoint, body);
	}

	kickUserFromChatroom(chatroomId: number, userId: number) : Observable<void> {
		const endpoint: string = `${this.apiURL}/kick/${chatroomId}/${userId}`;

		return this.authHttp.delete<void>(endpoint);
	}

	/**
	*** Punishments
	**/
	
	banUserFromChatroom(chatroomId: number, userId: number, durationInSec: number) : Observable<void> {
		const endsAt = (new Date()).getTime() + (durationInSec * 1000);
		const endpoint: string = `${this.apiURL}/punishment`;
		const body = {
			type: 'ban',
			chatroom_id: chatroomId,
			target_id: userId,
			ends_at: endsAt
		};
		return this.authHttp.post<void>(endpoint, body);
	}

	muteUserFromChatroom(chatroomId: number, userId: number, durationInSec: number) : Observable<void> {
		const endsAt = (new Date()).getTime() + (durationInSec * 1000);
		const endpoint: string = `${this.apiURL}/punishment`;
		const body = {
			type: 'mute',
			chatroom_id: chatroomId,
			target_id: userId,
			ends_at: endsAt
		};
		return this.authHttp.post<void>(endpoint, body);
	}

	/**
	*** Access
	**/

	requestAccessToChatroom(chatroomId: number, password: string) : Observable<boolean> { // you can modify using a get, I don't know tbh
		const endpoint: string = `${this.apiURL}`; // modify that
		const body = {
			type: 'askForAccess',
			chatroomId: chatroomId,
			password: password
		}
		return this.authHttp.put<boolean>(endpoint, body);
	}
}
