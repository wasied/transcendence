import { SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: "pong" })
export class PongGameGateway {
    @WebSocketServer() server: Server;

    private waitingPlayers: Map<string, Socket> = new Map();

    // TODO: Add our game service here
    // constructor(private readonly ourPongGame: ourPongGame) {}

    @SubscribeMessage('joinGame')
    async handleJoinGame(
        @ConnectedSocket() client: Socket
    ): Promise<void> {
        // Check for a waiting player or add in the queue

        const waitingPlayer = Array.from(this.waitingPlayers.values())[0];
        if (waitingPlayer) {
            this.waitingPlayers.delete(waitingPlayer.id);

            // Pair these players in a game
            // TODO: Start a new game with client.user.id and waitingPlayer.id
            const gameSessionId = "TODO"; // await this.ourPongGame.startNewGame(client.user.id, waitingPlayer.id);

            // Join them to a room named after the game session
            client.join(gameSessionId);
            waitingPlayer.join(gameSessionId);

            client.emit('gameStarted', { opponentId: waitingPlayer.id });
            waitingPlayer.emit('gameStarted', { opponentId: client.id });
        } else {
            this.waitingPlayers.set(client.id, client);
        }
    }

    @SubscribeMessage('gameStateUpdate')
    async handleGameStateUpdate(
        @ConnectedSocket() client: Socket,
        @MessageBody() body: any
    ): Promise<void> {
        // Transmit the game state to the other player

        // TODO: Get the opponent id from the game service
        const opponentId = "TODO"; // await this.ourPongGame.getOpponentId(client.user.id);
        client.to(opponentId).emit('gameStateUpdate', body);
    }

    @SubscribeMessage('leaveGame')
    async handleLeaveGame(
        @ConnectedSocket() client: Socket
    ): Promise<void> {
        // Leave a game

        const opponentId = "TODO"; // await this.ourPongGame.getOpponentId(client.user.id);
        client.to(opponentId).emit('opponentLeft');
        client.leave(opponentId);

        // TODO: Stop the game session here
    }
}
