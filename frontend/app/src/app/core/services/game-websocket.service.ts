import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
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
		this.socket = io(`${environment.appUrl}:${environment.backendAPIPort}/game`, options);
	}

    public listenToServerEvents(): void {
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

	// This will make the player join the matchmaking queue (the public one) until he finds someone
	// When he'll find someone, gameStarted will be called
	public joinMatchmaking(matchType: string): void {
        this.socket.emit('joinMatchmaking', { matchType: matchType });
    }

	// This is used for private matchmaking (from a chatroom)
	public joinPrivateGame(chatroomId: string): void {
		this.socket.emit('joinPrivateGame', { chatroomId: chatroomId });
	}

	// This will make the player join the session without actually being a player
	// So he'll just receive game updates for the match
    public startSpectating(spectatingUserId: string): void {
        this.socket.emit('startSpectating', { spectatingUserId: spectatingUserId });
    }

	// This will disconnect and stop the party for everyone
	// gameEnded will be called
    public disconnect(): void {
        this.socket.emit('leaveGame');
    }

	// This will make the player invite someone to play with him
	// It has nothing to do with the chat system but it's needed for the invitation to work
	public invitePlayer(opponentId: string): void {
        this.socket.emit('invitePlayer', opponentId);
    }

	// This will make the player accept the invitation of someone
	// It has nothing to do with the chat system but it's needed for the invitation to work
	public acceptInvitation(opponentId: string): void {
		this.socket.emit('acceptInvitation', opponentId);
	}

	public movePaddleUp(): void {
		this.socket.emit('movePaddleUp');
	}

	public movePaddleDown(): void {
		this.socket.emit('movePaddleDown');
	}

}