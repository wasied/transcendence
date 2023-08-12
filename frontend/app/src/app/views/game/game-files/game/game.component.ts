import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Keys } from '../game-interface';
import { Router } from '@angular/router';
import { AccessControlService } from 'src/app/core/services/access-control.service';
import { GameWebsocketService } from 'src/app/core/services/game-websocket.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
  	styles: [
    	`
			:host {
				display: block;
			}
			canvas {
				display: block;
				border-top: 8px solid #fff;
				border-bottom: 8px solid #fff;
			}
    	`,
  	],
	providers: [GameWebsocketService]
})
export class GameComponent implements OnInit, OnDestroy {
	
	@ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

	/* for communication between components */
	keys!: Keys;

	isMatched: boolean = false;
	loadingMessage: string = 'Please stand by';
	dotCount: number = 0;
  	timeoutStandById!: any;
	exitSessionId!: number; 

	constructor(private gameSocket: GameWebsocketService, private router: Router, private accessControlService: AccessControlService) {};

	/* MATCHMAKING UTILS */
	
	updateLoadingMessage() : void {
		if (!this.isMatched) {
			this.loadingMessage = 'Please stand by' + '.'.repeat(this.dotCount);
			this.dotCount = (this.dotCount + 1) % 4;
			this.timeoutStandById = setTimeout(() => this.updateLoadingMessage(), 500);
		}
	}

	/* GAME DATA TRANSPORTATION */
	ngOnInit(): void {
		this.keys = new Keys();

		console.log("wtf1")
		this.gameSocket.listenToServerEvents();
		this.gameSocket.joinMatchmaking('standard');
		console.log("wtf2")
		this.updateLoadingMessage();

		this.gameSocket.gameStarted$.subscribe(this.onGameStartedFromSocket);
		this.gameSocket.gameUpdate$.subscribe(this.onChangesFromSocket);
		this.gameSocket.gameEnded$.subscribe(this.onGameEndedFromSocket);
	}

	ngOnDestroy(): void {
		this.gameSocket.disconnect();
		console.log("stop")
		clearTimeout(this.timeoutStandById);
	}

	private onChangesFromSocket(data: any): void {

		// data.gameState.ballX: number;
		// data.gameState.ballY: number;
		// data.gameState.paddle1Y: number;
		// data.gameState.paddle2Y: number;
		// data.gameState.player1Score: number;
		// data.gameState.player2Score: number;
		// data.gameState.sessionId: number;
		
		console.log(data);
		this.sendPaddleState();
		// this.draw(data.gameState);
	}
	
	private onGameStartedFromSocket(data: any): void {
		this.isMatched = true;
		clearTimeout(this.timeoutStandById);

		// retrive session id from there :
		// this.exitSessionId = ;
	}
	
	/* GUARD */

	grantAccess(): void {
		this.accessControlService.setAccess(true);
	}

	private onGameEndedFromSocket(data: any): void {
		this.accessControlService.setAccess(true);
		this.router.navigate(['main', 'exit_game', this.exitSessionId]);
	}

	private sendPaddleState(): void {
		if (this.keys.arrowUp && this.keys.arrowDown) return;

		if (this.keys.arrowUp)
			this.gameSocket.movePaddleUp();
		else if (this.keys.arrowDown)
			this.gameSocket.movePaddleDown();
	}
	
	/* CONTROLS */
	@HostListener('window:keydown', ['$event'])
	handleKeyDown(event: KeyboardEvent): void {
		switch (event.key) {
			case 'ArrowUp':
				this.keys.arrowUp = true;
				break;
			case 'ArrowDown':
				this.keys.arrowDown = true;
				break;
		}
	}

	@HostListener('window:keyup', ['$event'])
	handleKeyUp(event: KeyboardEvent) : void {
		switch (event.key) {
			case 'ArrowUp':
				this.keys.arrowUp = false;
				break;
			case 'ArrowDown':
				this.keys.arrowDown = false;
				break;
		}
	}
}
