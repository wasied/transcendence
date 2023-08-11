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
        
		// Get update about the game (data is a structure with all informations needed)
		// WARNING: EVERYTHING IS IN % (0-1) !!! So x=0.5 means the ball is in the middle of the screen
        this.socket.on('gameUpdate', (data: any) => {

			// data.paddleLeft.y
			// data.paddleRight.y
			// data.ball.x
			// data.ball.y

        	this.gameUpdate$.next(data);
			
        });
    
        this.socket.on('gameEnded', (data: any) => {
        	this.gameEnded$.next(data);
        });
    }

	// This will make the player join the matchmaking queue (the public one) until he finds someone
	// When he'll find someone, gameStarted will be called
	public joinMatchmaking(): void {
        this.socket.emit('joinMatchmaking');
    }

	// This will make the player join the session without actually being a player
	// So he'll just receive game updates for the match
    public spectateGame(spectatingUserId: string): void {
        this.socket.emit('spectateGame', spectatingUserId);
    }

	// This will update the paddle position of the player serverside and sync it to everyone
    public updatePaddlePosition(state: any): void {
        this.socket.emit('paddlePositionUpdate', state);
    }

	// This will disconnect and stop the party for everyone
	// gameEnded will be called
    public disconnect(): void {
        this.socket.disconnect();
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

}