import { Component, ElementRef, ViewChild, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Keys } from '../game-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessControlService } from 'src/app/core/services/access-control.service';
import { GameWebsocketService } from 'src/app/core/services/game-websocket.service';
import { GameDataService } from '../../../../core/services/game-data.service';
import { GameData } from 'src/app/core/services/game-data.service';

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
	
	private _canvasRef: ElementRef;
	@ViewChild('canvas', { static: false, read: ElementRef })
	set canvasRef(canvasRef: ElementRef) {
		this._canvasRef = canvasRef;
		if (this._canvasRef) {
			this.canvas = this._canvasRef.nativeElement;
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight - 2 * 8;
			this.ctx = this.canvas.getContext('2d')!;
		}
	}

	/* for communication between components */
	private destroyed: boolean = false;
	private keys!: Keys;
	private canvas!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;
	/* game variant */
	private variant: string = 'standard';
	gameData!: GameData | null;

	chatroomId!: string | null;
	spectator!: boolean | null;
	userToSpectateId!: string | null;
	isMatched: boolean = false;
	loadingMessage: string = 'Please wait for an opponent';
	dotCount: number = 0;
  	timeoutStandById!: any;

	constructor(
		private gameSocket: GameWebsocketService,
		private router: Router,
		private accessControlService: AccessControlService,
		private gameDataService: GameDataService,
		private route: ActivatedRoute
	) {};

	/* MATCHMAKING UTILS */
	
	updateLoadingMessage() : void {
		if (!this.isMatched) {
			this.loadingMessage = 'Please wait for an opponent' + '.'.repeat(this.dotCount);
			this.dotCount = (this.dotCount + 1) % 4;
			this.timeoutStandById = setTimeout(() => this.updateLoadingMessage(), 500);
		}
	}

	/* GAME DATA TRANSPORTATION */
	ngOnInit(): void {
		this.chatroomId = this.route.snapshot.queryParamMap.get('chatroom_id');
		const spectator = this.route.snapshot.queryParamMap.get('spectator');
		this.userToSpectateId = this.route.snapshot.queryParamMap.get('user_id');

		if (spectator)
			this.spectator = JSON.parse(spectator);
		if (this.spectator && !this.userToSpectateId)
			return ;

		this.keys = new Keys();

		this.gameSocket.listenToServerEvents();
		this.gameDataService.getGameData().subscribe((data: any) => {
			this.gameData = data;
			
			if (this.gameData !== null) {
				this.variant = this.gameData.variant;
			}

			if (!this.spectator) {
				if (this.chatroomId !== null)
					this.gameSocket.joinPrivateGame(String(this.chatroomId));
				else
					this.gameSocket.joinMatchmaking(this.variant);
			} else {
				this.gameSocket.startSpectating(this.userToSpectateId!);
			}
		});

		this.updateLoadingMessage();

		this.gameSocket.gameStarted$.subscribe((data: any) => this.onGameStartedFromSocket(data));
		this.gameSocket.gameUpdate$.subscribe((data: any) => this.onChangesFromSocket(data));
		this.gameSocket.gameEnded$.subscribe((data: any) => this.onGameEndedFromSocket(data));
	}

	ngOnDestroy(): void {
		if (this.destroyed) return;
		this.destroyed = true;
		
		this.gameSocket.disconnect();
		clearTimeout(this.timeoutStandById);
	}

	private onChangesFromSocket(data: any): void {
		if (!this.isMatched)
			this.isMatched = true;

		this.draw(data);
		this.sendPaddleState();
	}
	
	private onGameStartedFromSocket(data: any): void {
		this.isMatched = true;
		clearTimeout(this.timeoutStandById);
	}

	private onGameEndedFromSocket(data: any): void {
		this.accessControlService.setAccess(true);
		
		this.gameDataService.updateGameData({
			variant: data.variant,
			scoreLeftPlayer: data.playerLeftScore,
			scoreRightPlayer: data.playerRightScore
		});
		this.accessControlService.setAccess(true);
		this.router.navigate(['main', 'exit_game']);
	}

	private sendPaddleState(): void {
		if (!this.isMatched) return;
		if (this.keys.arrowUp && this.keys.arrowDown) return;

		if (this.keys.arrowUp)
			this.gameSocket.movePaddleUp();
		else if (this.keys.arrowDown)
			this.gameSocket.movePaddleDown();
	}
	
	private draw(data: any): void {
		if (!this.isMatched) return;

		// Clear canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
		// Draw ball
		const ballX = this.canvas.width * data.ballX;
		const ballY = this.canvas.height * data.ballY;

		this.ctx.fillStyle = 'white';
		this.ctx.beginPath();
		this.ctx.arc(ballX, ballY, data.ballRadius, 0, 2 * Math.PI);
		this.ctx.fill();

		// Draw paddles
		const paddleHeight = data.paddleHeight * this.canvas.height;
		const paddleWidth = this.canvas.width * 0.01;
		const paddleLeftY = this.canvas.height * data.paddleLeftY - (paddleHeight / 2);
		const paddleRightY = this.canvas.height * data.paddleRightY - (paddleHeight / 2);
		
		this.ctx.fillRect(0, paddleLeftY, paddleWidth, paddleHeight);
		this.ctx.fillRect(this.canvas.width - paddleWidth, paddleRightY, paddleWidth, paddleHeight);
	
		// Draw scores
		this.ctx.font = '30px Arial';
		this.ctx.fillText(data.playerLeftScore.toString(), this.canvas.width * 0.40, 40);
		this.ctx.fillText(data.playerRightScore.toString(), this.canvas.width * 0.60, 40);
	}

	/* GUARD */

	grantAccess(): void {
		this.accessControlService.setAccess(true);
	}
	
	/* CONTROLS */
	@HostListener('window:beforeunload', ['$event'])
	beforeunloadHandler(event: any) {
		this.ngOnDestroy();
	}

	@HostListener('window:resize', ['$event'])
	handleResize(event: Event): void {
		if (!this.isMatched || !this.canvas) return;

		const borderSize = 8; // as defined in the styles
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight - 2 * borderSize;
	}

	@HostListener('window:keydown', ['$event'])
	handleKeyDown(event: KeyboardEvent): void {
		if (!this.isMatched) return;

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
		if (!this.isMatched) return;

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
