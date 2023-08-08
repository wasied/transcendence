import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GameService } from 'src/app/core/services/game.service';
import { GameData, GameDataService } from 'src/app/core/services/game-data.service';
import { PongData, GameState, Keys } from '../game-interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
	
	@ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

	/* for communication between components */
	gameData!: GameData | null;
	subscription!: Subscription;

	/* for the game itself */
	pongData!: PongData;
	gameState!: GameState;
	keys!: Keys;

	constructor(private gameDataService: GameDataService,
				private gameService: GameService,
				private router: Router) {};

	/* GAME DATA TRANSPORTATION */
	
	ngOnInit(): void {
		/* Init Game Params */
		this.pongData = new PongData();
		this.gameState = new GameState();
		this.keys = new Keys();
		/* Observable */
		// this.subscription = this.gameDataService.getGameData().subscribe(gameData => {
		// 	this.gameData = gameData;
		// });
	}

	ngOnDestroy(): void {
		/* remove subscription to avoid memory leaks */
		// if (this.subscription) {
		// 	this.subscription.unsubscribe();
		// }
		/* update the Game Data to further use in game exit component */
		// if (this.gameData) {
		// 	this.gameDataService.updateGameData(this.gameData);
		// }	
	}

	/* update gameData */
	private endgameDataProcessing() : void {
		const gameDuration: number | undefined = this.gameDataService.endGame();
		const scoreLeftPlayer: number = 12; // define this
		const scoreRightPlayer: number = 8; // define this
		
		if (this.gameData) {
			this.gameData.durationInSec = gameDuration;
			this.gameData.scoreLeftPlayer = scoreLeftPlayer;
			this.gameData.scoreRightPlayer = scoreRightPlayer;
		}
		
		/* then go to game exit view */
		this.routingToGameExit();
	}

	private routingToGameExit() : void {
		this.router.navigate(['main', 'game_exit']);
	}
	
	// private playerPaddle = false;
	// private leftPaddleControl = false;
	// private rightPaddleControl = false;

	// private onGameState(data: any): void {
	// 	this.gameState = data;
	// 	this.draw();
	// }
	
	// private onAssignedPaddle(data: any): void {
	// 	if (data.paddle === 'left' && !this.playerPaddle) {
	// 		this.playerPaddle = true;
	// 		this.leftPaddleControl = true;
	// 		this.rightPaddleControl = false;
	// 	} else if (data.paddle === 'right' && !this.playerPaddle) {
	// 		this.playerPaddle = true;
	// 		this.leftPaddleControl = false;
	// 		this.rightPaddleControl = true;
	// 	}
	// }
	
	/* GAME INIT AND TRIGGER EVERY_FRAME LOOP */

	ngAfterViewInit(): void {
		/* start timer */
		this.gameDataService.startGame();
		/* canvas management */
		this.pongData.ctx = this.canvasRef.nativeElement.getContext('2d') as CanvasRenderingContext2D;
		this.resizeCanvas();
		this.draw();
		this.registerEventListeners();
		this.animate();
	}

	private checkVictoryCondition() : void {

	}

	private animate(): void {
		this.updateBallPosition();
		this.draw();
		this.handlePaddleMoves();
		this.checkVictoryCondition();
		requestAnimationFrame(this.animate.bind(this));
	}

	private registerEventListeners(): void {
		window.addEventListener('resize', this.onResize.bind(this));
	}
	
	/* HANDLE RESIZE */

	private onResize(): void { // ok
		console.log('is resizing');
		this.resizeCanvas();
		this.draw();
	}
	
	private resizeCanvas(): void { // OK
		this.pongData.canvasWidth = window.innerWidth * 0.9;
		this.pongData.canvasHeight = this.pongData.canvasWidth / this.pongData.aspectRatio;
	
		this.canvasRef.nativeElement.width = this.pongData.canvasWidth;
		this.canvasRef.nativeElement.height = this.pongData.canvasHeight;
	}
	
	private draw(): void { // to test, but seems good
		
		if (!this.pongData.ctx || !this.gameState) {
			return;
		}
		/* clear old canva */
		this.pongData.ctx.clearRect(0, 0, this.pongData.canvasWidth, this.pongData.canvasHeight);
	  
		/* calculate new dimensions for the paddles */ 
		const paddle1X = (1 / 100) * this.pongData.canvasWidth;
		const paddle2X = (98 / 100) * this.pongData.canvasWidth;
		const paddleHeight = (this.pongData.paddleHeightPercentage / 100) * this.pongData.canvasHeight;
		const paddle1Y = (this.gameState.paddle1Y / 100) * this.pongData.canvasHeight - (paddleHeight / 2);
		const paddle2Y = (this.gameState.paddle2Y / 100) * this.pongData.canvasHeight - (paddleHeight / 2);
	  
		/* Draw both paddles for all players, in white */
		this.pongData.ctx.fillStyle = '#fff';
		this.pongData.ctx.fillRect(paddle1X, paddle1Y, this.pongData.paddleWidth, paddleHeight);
		this.pongData.ctx.fillRect(paddle2X, paddle2Y, this.pongData.paddleWidth, paddleHeight);
	  
		/* calculate new dimensions for the ball */
		const ballRadius = (this.pongData.ballRadiusPercentage / 100) * this.pongData.canvasWidth;
		const ballX = (this.gameState.ballX / 100) * this.pongData.canvasWidth;
		const ballY = (this.gameState.ballY / 100) * this.pongData.canvasHeight;
		
		/* draw the ball */
		this.pongData.ctx.beginPath();
		this.pongData.ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
		this.pongData.ctx.fillStyle = '#fff';
		this.pongData.ctx.fill();
	
		/* calculate the new score, if relevant */
		const scoreText = `${this.gameState.player1Score} - ${this.gameState.player2Score}`;
		const scoreX = (this.pongData.canvasWidth / 2) - 50;
		const scoreY = 30;

		/* display the new score */
		this.pongData.ctx.font = '24px Arial';
		this.pongData.ctx.fillStyle = '#fff';
		this.pongData.ctx.fillText(scoreText, scoreX, scoreY);
	
		this.pongData.ctx.closePath();
	}

	/* PHYSICS*/

  	/* handles ball position, including collision engine with borders, paddles, and out-of-terrain handling */
	private updateBallPosition(): void {

		/* updating ball position */
		const ballSpeedX = (this.gameState.ballSpeedX / 100) * this.pongData.canvasWidth;
		const ballSpeedY = (this.gameState.ballSpeedY / 100) * this.pongData.canvasHeight;

		this.gameState.ballX += ballSpeedX;
		this.gameState.ballY = (this.gameState.ballY + ballSpeedY + 100) % 100;

		/* case ball is out on the left side */
		if (this.gameState.ballX + this.pongData.ballRadiusPercentage <= 0) {
			if (!this.gameState.delayedRestart) {
				this.gameState.delayedRestart = true;
				this.gameState.player2Score++;
				setTimeout(() => {
					this.gameState.ballX = 5;
					this.gameState.ballY = this.gameState.paddle1Y;
					this.gameState.ballSpeedX = -this.gameState.ballSpeedX;
					this.gameState.delayedRestart = false;
					//this.sendGameState();
				}, 500);
			}
			return;
		}

		/* case ball is out on the right side */
		if (this.gameState.ballX - this.pongData.ballRadiusPercentage >= 100) {
			if (!this.gameState.delayedRestart) {
				this.gameState.delayedRestart = true;
				this.gameState.player1Score++;
				setTimeout(() => {
					this.gameState.ballX = 95;
					this.gameState.ballY = this.gameState.paddle2Y;
					this.gameState.ballSpeedX = -this.gameState.ballSpeedX;
					this.gameState.delayedRestart = false;
					//this.sendGameState();
				}, 500);
			}
			return;
		}

		/* case collision with top or bottom border */
		if (this.gameState.ballY - this.pongData.ballRadiusPercentage <= 0 
			|| this.gameState.ballY + this.pongData.ballRadiusPercentage >= 100) {
			this.gameState.ballSpeedY = -this.gameState.ballSpeedY;
		}

		/* Paddle collision with "physics" */
		const segmentHeight = this.pongData.paddleHeightPercentage / 8;

		const reflectionAngles = [
    		-60, -45, -30, -15, 15, 30, 45, 60
		];

		const paddle1TopY = this.gameState.paddle1Y - (this.pongData.paddleHeightPercentage / 2);
		const paddle2TopY = this.gameState.paddle2Y - (this.pongData.paddleHeightPercentage / 2);

		const BallSpeed = Math.sqrt(this.gameState.ballSpeedX * this.gameState.ballSpeedX 
    		+ this.gameState.ballSpeedY * this.gameState.ballSpeedY);

		if (
			this.gameState.ballX - this.pongData.ballRadiusPercentage <= 3.5 &&
			this.gameState.ballY + this.pongData.ballRadiusPercentage > this.gameState.paddle1Y 
				- (this.pongData.paddleHeightPercentage / 2) &&
			this.gameState.ballY - this.pongData.ballRadiusPercentage < this.gameState.paddle1Y 
				+ (this.pongData.paddleHeightPercentage / 2)
		) {
				console.log('left paddle collision triggered');

				const relativeHitPosition = this.gameState.ballY - paddle1TopY;
				const hitSegment = Math.floor(relativeHitPosition / segmentHeight);

				const reflectionAngle = reflectionAngles[hitSegment] * (Math.PI / 180);  // Convert degree to radians

				this.gameState.ballSpeedX = BallSpeed * Math.cos(reflectionAngle);
				this.gameState.ballSpeedY = BallSpeed * Math.sin(reflectionAngle);
		}
		
		if (
			this.gameState.ballX + this.pongData.ballRadiusPercentage >= 97.5 &&
			this.gameState.ballY + this.pongData.ballRadiusPercentage > this.gameState.paddle2Y 
				- (this.pongData.paddleHeightPercentage / 2) &&
			this.gameState.ballY - this.pongData.ballRadiusPercentage < this.gameState.paddle2Y 
				+ (this.pongData.paddleHeightPercentage / 2)
		) {
				
				console.log('right paddle collision triggered');

				const relativeHitPosition = this.gameState.ballY - paddle2TopY;
				const hitSegment = Math.floor(relativeHitPosition / segmentHeight);
			
				const reflectionAngle = reflectionAngles[hitSegment] * (Math.PI / 180);  // Convert degree to radians
			
				this.gameState.ballSpeedX = -BallSpeed * Math.cos(reflectionAngle);
				this.gameState.ballSpeedY = BallSpeed * Math.sin(reflectionAngle);
		}

		//this.sendGameState();
  	}

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

	// adapt with websockets to send paddle position
	handlePaddleMoves(): void {

		const MOVE_DISTANCE = 5; // change that shit

		const MIN_Y = 0;
		const MAX_Y = 100 - this.pongData.paddleHeightPercentage;
		
		if (this.gameState && this.gameState.paddle1Y !== undefined && this.gameState.paddle2Y !== undefined) {
			if (this.keys.arrowUp) {
				this.gameState.paddle1Y = Math.max(this.pongData.paddleHeightPercentage / 2, this.gameState.paddle1Y - MOVE_DISTANCE);
				this.gameState.paddle2Y = Math.max(this.pongData.paddleHeightPercentage / 2, this.gameState.paddle2Y - MOVE_DISTANCE);
			} else if (this.keys.arrowDown) {
				this.gameState.paddle1Y = Math.min(100 - this.pongData.paddleHeightPercentage / 2, this.gameState.paddle1Y + MOVE_DISTANCE);
				this.gameState.paddle2Y = Math.min(100 - this.pongData.paddleHeightPercentage / 2, this.gameState.paddle2Y + MOVE_DISTANCE);
			}
		}
	}
	
	// /* HostListener to handle key events */
	// @HostListener('window:keydown', ['$event'])
	// handleKeyDown(event: KeyboardEvent) {
	// 	if (this.playerPaddle) {
	// 		if (this.gameState && this.gameState.paddle1Y !== undefined && this.gameState.paddle2Y !== undefined) {
	// 	  		if (this.gameState.paddle1Y !== undefined && this.leftPaddleControl) {
	// 				if (event.key === 'ArrowUp') {
	// 		  			this.socket.emit('paddleMove', 
	// 					{ paddle1Y: this.gameState.paddle1Y - 5, paddle2Y: this.gameState.paddle2Y });
	// 				} else if (event.key === 'ArrowDown') {
	// 		  			this.socket.emit('paddleMove', 
	// 					{ paddle1Y: this.gameState.paddle1Y + 5, paddle2Y: this.gameState.paddle2Y });
	// 			}
	// 	  	} else if (this.gameState.paddle2Y !== undefined && this.rightPaddleControl) {
	// 			if (event.key === 'ArrowUp') {
	// 		  		this.socket.emit('paddleMove', 
	// 				{ paddle1Y: this.gameState.paddle1Y, paddle2Y: this.gameState.paddle2Y - 5 });
	// 			} else if (event.key === 'ArrowDown') {
	// 		  		this.socket.emit('paddleMove', 
	// 				{ paddle1Y: this.gameState.paddle1Y, paddle2Y: this.gameState.paddle2Y + 5 });
	// 				}
	// 	  		}
	// 		}
	//   	}
	// }
}
