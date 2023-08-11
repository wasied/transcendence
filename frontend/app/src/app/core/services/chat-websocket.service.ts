import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Chatroom } from 'src/app/core/models/chatroom.model';

@Injectable({
  providedIn: 'root'
})
export class ChatWebsocketService {
	private socket: Socket;

	public rooms$: Subject<Chatroom[]> = new Subject();
	public myRooms$: Subject<Chatroom[]> = new Subject();

	constructor(private readonly authService: AuthenticationService) {
		const options = {
			transportOptions: {
				polling: {
					extraHeaders: {
						Authorization: `Bearer ${this.authService.getTokenOnLocalSession()}`
					}
				}
			}
		};
		this.socket = io('http://localhost:8080/chat', options);
	}

	public listenToServerEvents(): void {
		this.socket.on('updateRooms', (chatrooms: Chatroom[]) => {
			this.rooms$.next(chatrooms);
		});

		this.socket.on('updateMyRooms', (myChatrooms: Chatroom[]) => {
			this.myRooms$.next(myChatrooms);
		});
	}

	connect(): void {
		this.socket.emit('connectChatrooms');
	}

	disconnect(): void {
		this.socket.emit('disconnectChatrooms');
	}

	createRoom(chatroomName: string, password: string | null, direct_message: boolean, other_user_id: number): void {
		this.socket.emit('createRoom', {
			name: chatroomName,
			password: password,
			direct_message: direct_message,
			other_user_id: other_user_id
		});
	}

	deleteRoom(chatroomId: number): void {
		this.socket.emit('deleteRoom', { chatroom_id: chatroomId });
	}

	joinRoom(roomId: number): void {
		this.socket.emit('joinRoom', { chatroom_id: roomId });
	}

	leaveRoom(roomId: number): void {
		this.socket.emit('leaveRoom', { chatroom_id: roomId });
	}

	setAdminStatus(roomId: number, userId: number, admin: boolean): void {
		this.socket.emit('setAdmin', {
			admin: admin,
			chatroom_id: roomId,
			user_id: userId
		});
	}

/*
	// Get list of chatrooms owned by user
	getOwnedChatrooms(userId: number): Observable<number[]> {
		this.socket.emit('getOwnedChatrooms', userId);
		return new Observable(observer => {
			this.socket.on('ownedChatrooms', (data: number[]) => {
				observer.next(data);
			});
		});
	}

	// Get list of chatrooms where user is an admin
	getAdminChatrooms(userId: number): Observable<number[]> {
		this.socket.emit('getAdminChatrooms', userId);
		return new Observable(observer => {
			this.socket.on('adminChatrooms', (data: number[]) => {
				observer.next(data);
			});
		});
	}
*/
}
