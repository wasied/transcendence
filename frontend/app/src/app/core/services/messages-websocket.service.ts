import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesWebsocketService {
	private socket: Socket;

	public updateMessages$: Subject<any> = new Subject();
	public newMessage$: Subject<any> = new Subject();

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
		this.socket = io('http://localhost:8080/messages', options);
	}

	private listenToServerEvents(): void {

		this.socket.on('updateMessages', (data: any) => {
			this.updateMessages$.next(data);
		});

		this.socket.on('newMessage', (data: any) => {
			this.newMessage$.next(data);
		});

	}

	public connect(chatroomId: number): void {
		this.socket.emit('connectMessages', { chatroom_id: chatroomId });
	}

	public disconnect(chatroomId: number): void {
		this.socket.emit('disconnectMessages', { chatroom_id: chatroomId });
	}
}
