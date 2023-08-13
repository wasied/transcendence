import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Chatroom } from 'src/app/core/models/chatroom.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class DirectMessagesWebsocketService {
	private socket: Socket;

	public directMessages$: Subject<Chatroom[]> = new Subject();

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
		this.socket = io(`${environment.appUrl}:${environment.backendAPIPort}/chat`, options);
	}

	public listenToServerEvents(): void {
		this.socket.on('updateDms', (chatrooms: Chatroom[]) => {
			this.directMessages$.next(chatrooms);
		});
	}

	connect(): void {
		this.socket.emit('connectDms');
	}

	disconnect(): void {
		this.socket.emit('disconnectDms');
	}

	createDirectMessage(other_user_id: number): void {
		this.socket.emit('createRoom', {
			name: "Direct message",
			password: null,
			direct_message: true,
			other_user_id: other_user_id
		});
	}
}
