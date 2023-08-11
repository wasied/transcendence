import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PongData, GameState, Keys } from '../game-interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
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
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
	
	@ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

	/* for communication between components */
	keys!: Keys;
	pongData!: PongData;

	constructor(private gameSocket: GameWebsocketService, private router: Router) {};

	/* GAME DATA TRANSPORTATION */
	ngOnInit(): void {
		this.keys = new Keys();

		this.pongData = new PongData();

		this.gameSocket.joinMatchmaking('standard');

		this.gameSocket.gameStarted$.subscribe(this.onGameStartedFromSocket);
		this.gameSocket.gameUpdate$.subscribe(this.onChangesFromSocket);
		this.gameSocket.gameEnded$.subscribe(this.onGameEndedFromSocket);
	}

	ngOnDestroy(): void {
		this.gameSocket.disconnect()
	}

	private onChangesFromSocket(data: any): void {

		// data.gameState.ballX: number;
		// data.gameState.ballY: number;
		// data.gameState.paddle1Y: number;
		// data.gameState.paddle2Y: number;
		// data.gameState.player1Score: number;
		// data.gameState.player2Score: number;
		// data.gameState.sessionId: number;
		
		this.sendPaddleState();
		this.draw(data.gameState);
		
	}
	
	private onGameStartedFromSocket(data: any): void {

		// appel après avoir trouvé un partenaire

	}
	
	private onGameEndedFromSocket(data: any): void {
		this.router.navigate(['main', 'exit_game']);
	}

	private sendPaddleState(): void {
		if (this.keys.arrowUp && this.keys.arrowDown) return;

		if (this.keys.arrowUp)
			this.gameSocket.movePaddleUp();
		else if (this.keys.arrowDown)
			this.gameSocket.movePaddleDown();
	}
	
	/* GAME INIT AND TRIGGER EVERY_FRAME LOOP */
	ngAfterViewInit(): void {
		this.pongData.ctx = this.canvasRef.nativeElement.getContext('2d') as CanvasRenderingContext2D;
		this.resizeCanvas();
		this.registerEventListeners();
	}

	private registerEventListeners(): void {
		window.addEventListener('resize', this.onResize.bind(this));
	}
	
	/* HANDLE RESIZE */
	private onResize(): void {
		this.resizeCanvas();
	}
	
	private resizeCanvas(): void {
		this.pongData.canvasWidth = window.innerWidth * 0.9;
		this.pongData.canvasHeight = this.pongData.canvasWidth / this.pongData.aspectRatio;
	
		this.canvasRef.nativeElement.width = this.pongData.canvasWidth;
		this.canvasRef.nativeElement.height = this.pongData.canvasHeight;
	}
	
	private draw(gameState: any): void { // to test, but seems good
		
		if (!this.pongData.ctx || !gameState) {
			return;
		}
		/* clear old canva */
		this.pongData.ctx.clearRect(0, 0, this.pongData.canvasWidth, this.pongData.canvasHeight);
	  
		/* calculate new dimensions for the paddles */ 
		const paddle1X = (1 / 100) * this.pongData.canvasWidth;
		const paddle2X = (98 / 100) * this.pongData.canvasWidth;
		const paddleHeight = (this.pongData.paddleHeightPercentage / 100) * this.pongData.canvasHeight;
		const paddle1Y = (gameState.paddle1Y / 100) * this.pongData.canvasHeight - (paddleHeight / 2);
		const paddle2Y = (gameState.paddle2Y / 100) * this.pongData.canvasHeight - (paddleHeight / 2);
	  
		/* Draw both paddles for all players, in white */
		this.pongData.ctx.fillStyle = '#fff';
		this.pongData.ctx.fillRect(paddle1X, paddle1Y, this.pongData.paddleWidth, paddleHeight);
		this.pongData.ctx.fillRect(paddle2X, paddle2Y, this.pongData.paddleWidth, paddleHeight);
	  
		/* calculate new dimensions for the ball */
		const ballRadius = (this.pongData.ballRadiusPercentage / 100) * this.pongData.canvasWidth;
		const ballX = (gameState.ballX / 100) * this.pongData.canvasWidth;
		const ballY = (gameState.ballY / 100) * this.pongData.canvasHeight;
		
		/* draw the ball */
		this.pongData.ctx.beginPath();
		this.pongData.ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
		this.pongData.ctx.fillStyle = '#fff';
		this.pongData.ctx.fill();
	
		/* display the new score */
		const scoreText = `${gameState.player1Score} - ${gameState.player2Score}`;
		const scoreTextWidth = this.pongData.ctx.measureText(scoreText).width;

		const scoreX = (this.pongData.canvasWidth / 2) - (scoreTextWidth / 2);
		const scoreY = 30; 

		/* display the new score */
		this.pongData.ctx.font = '24px Arial';
		this.pongData.ctx.fillStyle = '#fff';
		this.pongData.ctx.fillText(scoreText, scoreX, scoreY);
	
		this.pongData.ctx.closePath();
	}

	/* CONTROLS */
	@HostListener('window:keydown', ['$event'])
	handleKeyDown(event: KeyboardEvent): void {
		switch (event.key) {
			case 'ArrowUp':
				this.keys.arrowUp = true;
				event.preventDefault();
				break;
			case 'ArrowDown':
				this.keys.arrowDown = true;
				event.preventDefault();
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