
export interface PongParams {
	/*  Game static infos */
	ctx: CanvasRenderingContext2D;
	aspectRatio: number;
	canvasWidth: number;
	canvasHeight: number;
	paddleHeightPercentage: number;
	paddleWidth: number ;
	ballRadiusPercentage: number;
	ballSpeedPercentage: number;
	maxPaddleY: number;
	ballAccelerationFactor: number;
	ballMaxSpeed: number;
}

export interface GameEvolution {
	paddle1Y: number;
	paddle2Y: number;
	ballX: number;
	ballY: number;
	ballSpeedX: number;
	ballSpeedY: number,
	player1Score: number;
	player2Score: number;
	delayedRestart: boolean;
}

export interface KeysInterface {
	arrowUp: boolean,
	arrowDown: boolean
}

export class PongData implements PongParams {
	ctx!: CanvasRenderingContext2D;
	aspectRatio = 16 / 9;
	canvasWidth = 0;
	canvasHeight = 0;
	paddleHeightPercentage = 15;
	paddleWidth = 10;
	ballRadiusPercentage = 1;
	ballSpeedPercentage = 0.1;
	maxPaddleY = 100 - this.paddleHeightPercentage;
	ballAccelerationFactor = 1.05;
	ballMaxSpeed = 0.3; // change this if necessary
}

export class GameState implements GameEvolution {
	paddle1Y = 50;
	paddle2Y = 50;
	ballX = 50;
	ballY = 50;
	ballSpeedX = 0.1;
	ballSpeedY = 0.1;
	player1Score = 0;
	player2Score = 0;
	delayedRestart = false;
}

export class Keys implements KeysInterface {
	arrowUp = false;
	arrowDown = false; 
}
