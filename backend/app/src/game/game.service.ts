interface GameState {
    ballX: number;
    ballY: number;
    ballSpeedX: number;
    ballSpeedY: number;
    paddle1Y: number;
    paddle2Y: number;
    player1Score: number;
    player2Score: number;
    delayedRestart: boolean;
    timerId: any;
}

export interface GameData {
    player1Id: string;
    player2Id: string;
    canvasWidth: number;
    canvasHeight: number;
    ballRadius: number;
    ballAccelerationFactor: number;
    ballMaxSpeed: number;
    paddleHeight: number;
    variant: 'standard' | 'mortSubite' | 'twoPoints' | 'chaos';
}

export class PongGameService {
    private gameState: GameState;
    private gameData: GameData;

    constructor(gameData: GameData) {
        this.gameData = gameData;
        this.gameState = {
            ballX: gameData.canvasWidth / 2,
            ballY: gameData.canvasHeight / 2,
            ballSpeedX: 1.92, // initial speed, can be adjusted
            ballSpeedY: 1.08, // initial speed, can be adjusted
            paddle1Y: gameData.canvasHeight / 2,
            paddle2Y: gameData.canvasHeight / 2,
            player1Score: 0,
            player2Score: 0,
            delayedRestart: false,
            timerId: -1
        };
    }

    public setTimerId(intervalId: number): void {
        this.gameState.timerId = intervalId;
    }
    
    public getTimerId(): number {
        return this.gameState.timerId;
    }
    
    public updateGame(): void {
        this.updateBallCoordinates();
        this.handleBallOutOfBounds();
        this.handleWallCollisions();
        this.handlePaddleCollisions();
    }

    public updateLeftPaddlePosition(y: number): void {
        this.gameState.paddle1Y = y;
    }

    public updateRightPaddlePosition(y: number): void {
        this.gameState.paddle2Y = y;
    }

    public getGameState(): GameState {
        return this.gameState;
    }

    public getGameData(): GameData {
        return this.gameData;
    }

    public getAllGameData(sessionId: number): { sessionId: number; gameState: GameState; gameData: GameData } {
        return {
            sessionId: sessionId,
            gameState: this.gameState,
            gameData: this.gameData
        };
    }

    public movePaddleUp(isPlayerOne: boolean): void {
        const paddleIdx = `paddle${isPlayerOne ? 1 : 2}Y`;
        this.gameState[paddleIdx] -= 10;

        if (this.gameState[paddleIdx] < 0)
            this.gameState[paddleIdx] = 0;
        else if (this.gameState[paddleIdx] > this.gameData.canvasHeight)
            this.gameState[paddleIdx] = this.gameData.canvasHeight;
    }

    public movePaddleDown(isPlayerOne: boolean): void {
        const paddleIdx = `paddle${isPlayerOne ? 1 : 2}Y`;
        this.gameState[paddleIdx] += 10;

        if (this.gameState[paddleIdx] < 0)
            this.gameState[paddleIdx] = 0;
        else if (this.gameState[paddleIdx] > this.gameData.canvasHeight)
            this.gameState[paddleIdx] = this.gameData.canvasHeight;
    }

    private updateBallCoordinates(): void {
        this.gameState.ballX += this.gameState.ballSpeedX;
        this.gameState.ballY += this.gameState.ballSpeedY;
    }

    private handleBallOutOfBounds(): void {
        const leftOutOfBounds = this.gameState.ballX + this.gameData.ballRadius <= 0;
        const rightOutOfBounds = this.gameState.ballX - this.gameData.ballRadius >= this.gameData.canvasWidth;

        if (leftOutOfBounds) {
            this.scoreAndReset('player2', 5, this.gameState.paddle1Y);
        } else if (rightOutOfBounds) {
            this.scoreAndReset('player1', this.gameData.canvasWidth - 5, this.gameState.paddle2Y);
        }
    }

    private scoreAndReset(player: 'player1' | 'player2', resetX: number, resetY: number): void {
        if (!this.gameState.delayedRestart) {
            this.gameState.delayedRestart = true;
            this.gameState[player + 'Score']++;

            setTimeout(() => {
                this.resetBall(resetX, resetY);
                this.gameState.delayedRestart = false;
            }, 500);
        }
    }

    private resetBall(x: number, y: number): void {
        this.gameState.ballX = x;
        this.gameState.ballY = y;
        this.gameState.ballSpeedX = 1.92;  // Assuming initial speed value
        this.gameState.ballSpeedY = 1.08;  // Assuming initial speed value
    }

    private handleWallCollisions(): void {
        const hitTopOrBottom = 
            this.gameState.ballY - this.gameData.ballRadius <= 0 || 
            this.gameState.ballY + this.gameData.ballRadius >= this.gameData.canvasHeight;

        if (hitTopOrBottom) {
            this.gameState.ballSpeedY = -this.gameState.ballSpeedY;
        }
    }

    private handlePaddleCollisions(): void {
        const hitPaddle1 = this.ballHitPaddle(2, this.gameState.paddle1Y);
        const hitPaddle2 = this.ballHitPaddle(this.gameData.canvasWidth - 2, this.gameState.paddle2Y);

        if (hitPaddle1) {
            const relativeHitPosition = this.gameState.ballY - this.gameState.paddle1Y;
            this.updateBallSpeedAfterPaddleHit(relativeHitPosition, true);
        } else if (hitPaddle2) {
            const relativeHitPosition = this.gameState.ballY - this.gameState.paddle2Y;
            this.updateBallSpeedAfterPaddleHit(relativeHitPosition, false);
        }
    }

    private ballHitPaddle(paddleX: number, paddleY: number): boolean {
        return (
            Math.abs(this.gameState.ballX - paddleX) <= this.gameData.ballRadius &&
            this.gameState.ballY + this.gameData.ballRadius > paddleY - this.gameData.paddleHeight / 2 &&
            this.gameState.ballY - this.gameData.ballRadius < paddleY + this.gameData.paddleHeight / 2
        );
    }

    private updateBallSpeedAfterPaddleHit(relativeHitPosition: number, hitLeftPaddle: boolean): void {
        const segmentHeight = this.gameData.paddleHeight / 8;
        const hitSegment = Math.min(7, Math.max(0, Math.floor(relativeHitPosition / segmentHeight)));
        const newSpeeds = this.calculateNewBallSpeed(hitSegment);

        this.gameState.ballSpeedX = hitLeftPaddle ? newSpeeds.ballSpeedX : -newSpeeds.ballSpeedX;
        this.gameState.ballSpeedY = newSpeeds.ballSpeedY;

        const adjustment = hitLeftPaddle ? 2.5 + this.gameData.ballRadius : this.gameData.canvasWidth - 2.5 - this.gameData.ballRadius;
        this.gameState.ballX = adjustment;
    }

    private calculateNewBallSpeed(hitSegment: number): { ballSpeedX: number; ballSpeedY: number } {
        if (this.gameData.variant === 'chaos') {
            hitSegment = this.randomSegment();
        }

        const reflectionAngles = [-50, -40, -25, -15, 15, 25, 40, 50].map(angle => angle * (Math.PI / 180));
        const reflectionAngle = reflectionAngles[hitSegment];

        const currentSpeedMagnitude = Math.sqrt(
            this.gameState.ballSpeedX ** 2 + this.gameState.ballSpeedY ** 2
        );
        const newSpeedMagnitude = Math.min(
            currentSpeedMagnitude * this.gameData.ballAccelerationFactor,
            this.gameData.ballMaxSpeed
        );

        return {
            ballSpeedX: newSpeedMagnitude * Math.cos(reflectionAngle),
            ballSpeedY: newSpeedMagnitude * Math.sin(reflectionAngle)
        };
    }

    private randomSegment(): number {
        return Math.floor(Math.random() * 8);
    }
}
