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
            ballSpeedX: 10,
            ballSpeedY: 8,
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

    public isGameEnded(): boolean {
        const { player1Score, player2Score } = this.gameState;
    
        const hasTwoPointLead = (score1: number, score2: number) => {
            return (score1 >= 11 && score1 - score2 >= 2) || (score2 >= 11 && score2 - score1 >= 2);
        };
    
        switch (this.gameData.variant) {
            case 'standard':
            case 'chaos':
                return hasTwoPointLead(player1Score, player2Score);
            case 'mortSubite':
                return player1Score >= 1 || player2Score >= 1;
            case 'twoPoints':
                return Math.abs(player1Score - player2Score) >= 2;
            default:
                return false;
        }
    }

    public movePaddleUp(playerId: string): void {
        const isPlayerOne = (playerId === this.gameData.player1Id);
        const paddleIdx = `paddle${isPlayerOne ? 1 : 2}Y`;

        this.gameState[paddleIdx] -= 20;

        const minY = this.gameData.paddleHeight / 2;
        const maxY = this.gameData.canvasHeight - this.gameData.paddleHeight / 2;

        if (this.gameState[paddleIdx] < minY)
            this.gameState[paddleIdx] = minY;
        else if (this.gameState[paddleIdx] > maxY)
            this.gameState[paddleIdx] = maxY;
    }

    public movePaddleDown(playerId: string): void {
        const isPlayerOne = (playerId === this.gameData.player1Id);
        const paddleIdx = `paddle${isPlayerOne ? 1 : 2}Y`;

        this.gameState[paddleIdx] += 20;

        const minY = this.gameData.paddleHeight / 2;
        const maxY = this.gameData.canvasHeight - this.gameData.paddleHeight / 2;

        if (this.gameState[paddleIdx] < minY)
            this.gameState[paddleIdx] = minY;
        else if (this.gameState[paddleIdx] > maxY)
            this.gameState[paddleIdx] = maxY;
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
        this.gameState[player + 'Score']++;
        this.resetBall(resetX, resetY);
    }

    private resetBall(x: number, y: number): void {
        this.gameState.ballX = x;
        this.gameState.ballY = y;
        this.gameState.ballSpeedX = 10;
        this.gameState.ballSpeedY = 8;
    }

    private handleWallCollisions(): void {

        const hitTop = this.gameState.ballY - this.gameData.ballRadius <= 0;
        const hitBottom = this.gameState.ballY + this.gameData.ballRadius >= this.gameData.canvasHeight;

        if (hitTop || hitBottom) {
            this.gameState.ballSpeedY = -this.gameState.ballSpeedY;

            if (hitTop) {
                this.gameState.ballY = this.gameData.ballRadius;
            } else {
                this.gameState.ballY = this.gameData.canvasHeight - this.gameData.ballRadius;
            }
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
