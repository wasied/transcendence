import { SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { GameWebsocketGuard } from './game-websocket.guard';
import { SocketWithUser } from '../utils/SocketWithUser';
import { PongGame, GameData } from './game.service';

@WebSocketGateway({ cors: true, namespace: 'game' })
@UseGuards(GameWebsocketGuard)
export class PongGameGateway {
    @WebSocketServer() server: Server;

    private waitingPlayers: Map<string, Socket> = new Map();
    private playersInvitations = new Map<string, Map<string, Socket>>();
    private gameSessions = {};
    private spectators = {};

    // Pair these players in a game
    private startGame(isPublic: boolean, playerOneId: string, playerTwoId: string, playerOneSocket: Socket, playerTwoSocket: Socket, matchType: GameData['variant']): void {
        const gameSessionId = `${isPublic ? 'public' : 'private'}-${playerOneId}-${playerTwoId}`;

        const gameData: GameData = {
            player1Id: playerOneId,
            player2Id: playerTwoId,
            canvasWidth: 1920,
            canvasHeight: 1080,
            ballRadius: 10,
            ballAccelerationFactor: 1,
            ballMaxSpeed: 1,
            paddleHeight: 160,
            variant: matchType
        }        

        const gameInstance = new PongGame(gameData);
        const intervalId: any = setInterval(() => {
            gameInstance.updateGame();
            this.server.to(gameSessionId).emit('gameUpdate', gameInstance.getAllGameData(1));
        }, 1000 / 60)

        gameInstance.setTimerId(intervalId);

        this.gameSessions[gameSessionId] = gameInstance;

        playerOneSocket.join(gameSessionId);
        playerTwoSocket.join(gameSessionId);

        // TODO: create session and return the id inside the data

        this.server.to(gameSessionId).emit('gameStarted', gameInstance.getAllGameData(1));
    }

    // Explode game id
    private explodeGameId(gameId: string): any {
        const explodedGameId = gameId.split('-');
        if (explodedGameId.length !== 3) return (null);

        return ({
            isPublic: explodedGameId[0] === 'public',
            playerOneId: explodedGameId[1],
            playerTwoId: explodedGameId[2]
        });
    }

    // When a player joins the matchmaking
    @SubscribeMessage('joinMatchmaking')
    async handleJoinMatchmaking(
        @ConnectedSocket() client: SocketWithUser,
        @MessageBody() body: any
    ): Promise<void> {

        // Check if the user is already in a room
        const theRoomTheUserIsIn = Object.keys(client.rooms).filter(room => room !== client.id)[0];
        if (theRoomTheUserIsIn) return;

        const matchType = body.matchType;
        if (!matchType) return;
        if (matchType !== 'standard' && matchType !== 'chaos') return;

        const waitingPlayerSocket = Array.from(this.waitingPlayers.values())[0];
        if (waitingPlayerSocket) {
            const waitingPlayer = Array.from(this.waitingPlayers.keys())[0];
            this.waitingPlayers.delete(waitingPlayerSocket.id);

            this.startGame(true, String(client.user.id), waitingPlayer, client, waitingPlayerSocket, matchType);
        } else {
            this.waitingPlayers.set(String(client.user.id), client);
        }

    }

    // When a player joins a game as a spectator
    @SubscribeMessage('startSpectating')
    async handleStartSpectating(
        @ConnectedSocket() client: SocketWithUser,
        @MessageBody() body: any
    ): Promise<void> {

        const spectatedUserId = body.spectatingUserId;
        if (!spectatedUserId) return;

        let gameSessionId = null;
        for (const gameId of Object.keys(this.gameSessions)) {
            
            const extractedData = this.explodeGameId(gameId);
            if (!extractedData) continue;

            if (extractedData.playerOneId === spectatedUserId || extractedData.playerTwoId === spectatedUserId) {
                gameSessionId = gameId;
                break;
            }
        }
        if (!gameSessionId) return;
        
        this.spectators[client.user.id] = this.spectators[client.user.id] || {};
        this.spectators[client.user.id] = [gameSessionId, client]

        client.join(gameSessionId);

    }

    @SubscribeMessage('disconnect')
    async handleDisconnect(
        @ConnectedSocket() client: SocketWithUser,
    ): Promise<void> {

        const theRoomTheUserIsIn = Object.keys(client.rooms).filter(room => room !== client.id)[0];
        if (theRoomTheUserIsIn) {
            
            const gameSession = this.gameSessions[theRoomTheUserIsIn];
            if (gameSession) {

                if (this.spectators[client.user.id] && this.spectators[client.user.id][0] === theRoomTheUserIsIn) {
                    client.leave(theRoomTheUserIsIn);
                    delete this.spectators[client.user.id];
                    return;
                }

                // TODO: Pass the data here AND when the score is finished

                this.server.to(theRoomTheUserIsIn).emit('gameEnded', gameSession.getAllGameData(1));
                client.leave(theRoomTheUserIsIn);

                if (gameSession.getTimerId() !== -1)
                    clearInterval(gameSession.getTimerId());

                delete this.gameSessions[theRoomTheUserIsIn];
            }

            for (const spectatorData of Object.values(this.spectators)) {
                if (spectatorData[0] === theRoomTheUserIsIn) {
                    spectatorData[1].leave(spectatorData[0]);
                    delete this.spectators[client.user.id];
                }
            }

        } else if (this.waitingPlayers.has(String(client.user.id))) {
            this.waitingPlayers.delete(String(client.user.id));
        }

        // Delete all invitations to this player
        if (this.playersInvitations[String(client.user.id)]) {
            delete this.playersInvitations[String(client.user.id)];
        }

        // Delete all invitations sent to another players
        for (const inviterMap of Object.values(this.playersInvitations)) {
            if (inviterMap.has(String(client.user.id))) {
                inviterMap.delete(String(client.user.id));
            }
        }
    }

    @SubscribeMessage('movePaddleUp')
    async handleMovePaddleUp(
        @ConnectedSocket() client: SocketWithUser,
    ): Promise<void> {

        const theRoomTheUserIsIn = Object.keys(client.rooms).filter(room => room !== client.id)[0];
        if (!theRoomTheUserIsIn) return;

        const gameSession = this.gameSessions[theRoomTheUserIsIn];
        if (!gameSession) return;

        gameSession.movePaddleUp(client.user.id);

    }

    @SubscribeMessage('movePaddleDown')
    async handleMovePaddleDown(
        @ConnectedSocket() client: SocketWithUser,
    ): Promise<void> {

        const theRoomTheUserIsIn = Object.keys(client.rooms).filter(room => room !== client.id)[0];
        if (!theRoomTheUserIsIn) return;

        const gameSession = this.gameSessions[theRoomTheUserIsIn];
        if (!gameSession) return;

        gameSession.movePaddleDown(client.user.id);

    }

    // Invite a player to a game
    @SubscribeMessage('invitePlayer')
    async handleInvitePlayer(
        @ConnectedSocket() client: SocketWithUser,
        @MessageBody() body: any
    ): Promise<void> {

        const opponentId = String(body.opponentId);
        if (!opponentId) return;

        this.playersInvitations[opponentId] = this.playersInvitations[opponentId] || (new Map());
        this.playersInvitations[opponentId].set(String(client.user.id), client);

    }

    // Accept an invitation
    @SubscribeMessage('acceptInvitation')
    async handleAcceptInvitation(
        @ConnectedSocket() client: SocketWithUser,
        @MessageBody() body: any
    ): Promise<void> {

        const opponentId = String(body.opponentId);
        if (!opponentId) return;

        if (this.playersInvitations[String(client.user.id)].has(opponentId)) {
            const opponentSocket = this.playersInvitations[String(client.user.id)].get(opponentId);

            this.playersInvitations[String(client.user.id)].delete(opponentId);
            if (this.playersInvitations[String(client.user.id)].size === 0) {
                delete this.playersInvitations[String(client.user.id)];
            }

            this.startGame(false, String(client.user.id), opponentId, client, opponentSocket, 'standard');
        }

    }

}
