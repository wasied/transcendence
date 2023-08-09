import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class PongGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private paddle1Y = 50;
  private paddle2Y = 50;
  private ballX = 50;
  private ballY = 50;

  private canvasWidth = 0;
  private canvasHeight = 0;
  private ballRadiusPercentage = 1;
  private ballSpeedPercentage = 0.1;
  private ballSpeedX = 0.1;
  private ballSpeedY = 0.1;
  private paddleHeightPercentage = 15;
  private maxPaddleY = 100 - this.paddleHeightPercentage;

  private players: { [key: string]: Socket } = {};

  private player1Score = 0;
  private player2Score = 0;

  private updateInterval: NodeJS.Timeout | null = null; 
  constructor() {
    this.updateBallPosition();
    this.updateInterval = setInterval(() => {
      this.updateBallPosition();
    }, 33);
  }

  private updateBallPosition(): void {
    const ballSpeedX = (this.ballSpeedX / 100) * this.canvasWidth;
    const ballSpeedY = (this.ballSpeedY / 100) * this.canvasHeight;

    this.ballX = (this.ballX + ballSpeedX + 100) % 100;
    this.ballY = (this.ballY + ballSpeedY + 100) % 100;

    if (this.ballX - this.ballRadiusPercentage <= 0) {
      this.player2Score++;
      this.ballX = 5;
      this.ballY = this.paddle1Y;
      this.ballSpeedX = -this.ballSpeedX;
      this.sendGameState();
      return;
    }

    if (this.ballX + this.ballRadiusPercentage >= 100) {
      this.player1Score++;
      this.ballX = 95;
      this.ballY = this.paddle2Y;
      this.ballSpeedX = -this.ballSpeedX;
      this.sendGameState();
      return;
    }

    if (this.ballY - this.ballRadiusPercentage <= 0 || this.ballY + this.ballRadiusPercentage >= 100) {
      this.ballSpeedY = -this.ballSpeedY;
    }

    // Paddle collision with "physics"
    if (
      this.ballX - this.ballRadiusPercentage <= 3 &&
      this.ballY > this.paddle1Y &&
      this.ballY < this.paddle1Y + this.paddleHeightPercentage
    ) {
      const relativeHitPosition = (this.paddle1Y + this.paddleHeightPercentage / 2) - this.ballY;
      const hitPosition = relativeHitPosition / (this.paddleHeightPercentage / 2);

      const reflectionAngle = hitPosition * (Math.PI / 3);
      const BallSpeed = Math.sqrt(this.ballSpeedX * this.ballSpeedX + this.ballSpeedY * this.ballSpeedY);

      this.ballSpeedX = Math.cos(reflectionAngle) * BallSpeed;
      this.ballSpeedY = Math.sin(reflectionAngle) * BallSpeed;
    }

    if (
      this.ballX + this.ballRadiusPercentage >= 98 &&
      this.ballY > this.paddle2Y &&
      this.ballY < this.paddle2Y + this.paddleHeightPercentage
    ) {
      const relativeHitPosition = (this.paddle2Y + this.paddleHeightPercentage / 2) - this.ballY;
      const hitPosition = relativeHitPosition / (this.paddleHeightPercentage / 2);

      const reflectionAngle = hitPosition * (Math.PI / 3);
      const BallSpeed = Math.sqrt(this.ballSpeedX * this.ballSpeedX + this.ballSpeedY * this.ballSpeedY);

      this.ballSpeedX = -Math.cos(reflectionAngle) * BallSpeed;
      this.ballSpeedY = Math.sin(reflectionAngle) * BallSpeed;
    }

    this.sendGameState();
  }

  private assignPaddle(client: Socket, clientId: string): void {
    if (Object.keys(this.players).length === 1) {
      this.paddle1Y = 50;
      client.emit('assignedPaddle', { paddle: 'left', clientId });
    } else if (Object.keys(this.players).length === 2) {
      this.paddle2Y = 50;
      client.emit('assignedPaddle', { paddle: 'right', clientId });
    } else {
      client.emit('assignedPaddle', { paddle: 'spectator', clientId });
    }
  }

  handleConnection(client: Socket) {
    const clientId = client.id;
    if (Object.keys(this.players).length < 2) {
      this.players[clientId] = client;
      this.assignPaddle(client, clientId);
      console.log(`New player connected: ${clientId}`);
    } else {
      client.emit('gameState', { error: 'Only two players allowed' });
      client.disconnect(true);
    }

    this.canvasWidth = 1600;
    this.canvasHeight = (this.canvasWidth / 16) * 9;
    this.sendGameState();
  }

  handleDisconnect(client: Socket) {
    delete this.players[client.id];
  }

  private sendGameState(): void {
    if (this.server) {
      this.server.emit('gameState', {
        paddle1Y: this.paddle1Y,
        paddle2Y: this.paddle2Y,
        ballX: this.ballX,
        ballY: this.ballY,
        player1Score: this.player1Score,
        player2Score: this.player2Score,
      });
    }
  }

  @SubscribeMessage('paddleMove')
  handlePaddleMove(client: Socket, data: { paddle1Y: number; paddle2Y: number }) {
    this.paddle1Y = Math.max(Math.min(data.paddle1Y, this.maxPaddleY), 0);
    this.paddle2Y = Math.max(Math.min(data.paddle2Y, this.maxPaddleY), 0);
    this.sendGameState();
  }
}
