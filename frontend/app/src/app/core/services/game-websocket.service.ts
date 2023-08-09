import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthenticationService } from './authentication.service';

export class GameWebsocketService {
	private socket: Socket;

    public gameStarted$: Subject<any> = new Subject();
    public gameUpdate$: Subject<any> = new Subject();
    public gameEnded$: Subject<any> = new Subject();

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
		this.socket = io('http://localhost:8080/game', options);
	}

    private listenToServerEvents(): void {
        this.socket.on('gameStarted', (data: any) => {
          this.gameStarted$.next(data);
        });
        
        this.socket.on('gameUpdate', (data: any) => {
          this.gameUpdate$.next(data);
        });
    
        this.socket.on('gameEnded', (data: any) => {
          this.gameEnded$.next(data);
        });
    }

    public joinGame(): void {
        this.socket.emit('joinGame');
    }

    public updatePaddlePosition(state: any): void {
        this.socket.emit('paddlePositionUpdate', state);
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}