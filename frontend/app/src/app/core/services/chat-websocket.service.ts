import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatWebsocketService {
	private socket: SocketIOClient.Socket;

	constructor() {
		this.socket = io('http://localhost:8080');
	}

	// Join a chatroom
	joinRoom(roomId: number, userId: number): void {
		this.socket.emit('joinRoom', { roomId, userId });
	}

	// Leave a chatroom
	leaveRoom(roomId: number, userId: number): void {
		this.socket.emit('leaveRoom', { roomId, userId });
	}

	// Listen for channel messages
	getMessages(): Observable<any> {
		return new Observable(observer => {
			this.socket.on('updateMessages', (data: any) => {
				observer.next(data);
			});
		});
	}

	// Send a new message to the chatroom
	sendMessage(roomId: number, userId: number, message: string): void {
		this.socket.emit('newMessage', { roomId, userId, message });
	}

	// Set or unset admin rights for a user in a chatroom
	setAdminStatus(roomId: number, userId: number, admin: boolean): void {
		this.socket.emit('setAdmin', { roomId, userId, admin });
	}

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
}
