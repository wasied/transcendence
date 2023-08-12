import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class MessagesWebsocketService {
  private socket: Socket;

	public updateMessages$: Subject<any> = new Subject();

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

	public listenToServerEvents(): void {

		this.socket.on('updateMessages', (data: any) => {
			this.updateMessages$.next(data);
		});

		this.socket.on('newMessages', chatroomId => {
			this.socket.emit('getUpdateMessages', {
				chatroom_id: chatroomId
			});
		});

	}

	public connect(chatroomId: number): void {
		this.socket.emit('connectMessage', { chatroom_id: chatroomId });
	}

	public disconnect(chatroomId: number): void {
		this.socket.emit('disconnectMessage', { chatroom_id: chatroomId });
	}

	public sendMessage(roomId: number, message: string): void {
		this.socket.emit('sendMessage', {
			chatroom_id: roomId,
			content: message
		});
	}
}
