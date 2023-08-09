import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ChatWebsocketService {
	private socket: SocketIOClient.Socket;

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

	// Connect to a chatroom
	connectRoom(roomId: number): void {
		this.socket.emit('connectRoom', { chatroom_id: roomId });
	}

	// Disconnect from a chatroom
	disconnectRoom(roomId: number): void {
		this.socket.emit('disconnectRoom', { chatroom_id: roomId });
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
