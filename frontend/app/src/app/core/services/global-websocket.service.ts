import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/app/core/models/user.model';

@Injectable({
	providedIn: 'root'
})
export class GlobalWebsocketService {
	private socket: Socket;

	updateFriends$: Subject<User[]> = new Subject();

	constructor(private readonly authService: AuthenticationService) {}

	connect(): void {
		console.log('wtf?');
		const options = {
			transportOptions: {
				polling: {
					extraHeaders: {
						Authorization: `Bearer ${this.authService.getTokenOnLocalSession()}`
					}
				}
			}
		};

		this.socket = io('http://localhost:8080/global', options);
		this.socket.emit('connectGlobal');
	}

	disconnect(): void {
		this.socket.emit('disconnectGlobal');
		this.socket.disconnect();
	}

	public listenToServerEvents(): void {
		this.socket.on('updateConnections', (data: any) => {
			this.socket.emit('getUpdateFriends');
		});

		this.socket.on('updateFriends', (friends: User[]) => {
			this.updateFriends$.next(friends);
		});
	}
}
