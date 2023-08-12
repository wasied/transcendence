import { SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { GameWebsocketGuard } from './game-websocket.guard';
import { SocketWithUser } from '../utils/SocketWithUser';
import { PongGameService, GameData } from './game.service';
import { SessionsService } from '../sessions/sessions.service';

@WebSocketGateway({ cors: true, namespace: 'game' })
@UseGuards(GameWebsocketGuard)
export class PongGameGateway {
    @WebSocketServer() server: Server;

    constructor(private sessionsService: SessionsService) {}

    private waitingPlayers: Map<string, [Socket, string]> = new Map();
    private playersInvitations = new Map<string, Map<string, Socket>>();
    private gameSessions = {};
    private spectators = {};

    // Convert data to a client-friendly format
    private translateDataForClient(data: any): any {
        return {
            ballX: (data.gameState.ballX / data.gameData.canvasWidth),
            ballY: (data.gameState.ballY / data.gameData.canvasHeight),
            paddleLeftY: (data.gameState.paddle1Y / data.gameData.canvasHeight),
            paddleRightY: (data.gameState.paddle2Y / data.gameData.canvasHeight),
            paddleHeight: (data.gameData.paddleHeight / data.gameData.canvasHeight),
            playerLeftScore: data.gameState.player1Score,
            playerRightScore: data.gameState.player2Score,
            playerLeftId: data.gameData.player1Id,
            playerRightId: data.gameData.player2Id,
            ballRadius: data.gameData.ballRadius,
            variant: data.gameData.variant
        }
    }

    // Pair these players in a game
    private async startGame(isPublic: boolean, playerOneId: string, playerTwoId: string, playerOneSocket: Socket, playerTwoSocket: Socket, matchType: GameData['variant']): Promise<void> {
        const gameSessionId = `${isPublic ? 'public' : 'private'}-${playerOneId}-${playerTwoId}`;

        const gameData: GameData = {
            player1Id: playerOneId,
            player2Id: playerTwoId,
            canvasWidth: 1920,
            canvasHeight: 1080,
            ballRadius: 10,
            ballAccelerationFactor: 2,
            ballMaxSpeed: 30,
            paddleHeight: 160,
            variant: matchType
        }        

        const gameInstance = new PongGameService(gameData);
        const sessionId = await this.sessionsService.create(isPublic, false);

        const intervalId: any = setInterval(() => {

            gameInstance.updateGame();

            const isEnded = gameInstance.isGameEnded();
            if (isEnded) {
                this.server.to(gameSessionId).emit('gameEnded', this.translateDataForClient(gameInstance.getAllGameData(sessionId)));
                return clearInterval(intervalId);
            }

            this.server.to(gameSessionId).emit('gameUpdate', this.translateDataForClient(gameInstance.getAllGameData(sessionId)));

        }, 1000 / 60);

        gameInstance.setTimerId(intervalId);

        this.gameSessions[gameSessionId] = gameInstance;

        playerOneSocket.join(gameSessionId);
        playerTwoSocket.join(gameSessionId);

        this.server.to(gameSessionId).emit('gameStarted', this.translateDataForClient(gameInstance.getAllGameData(sessionId)));
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
        if (matchType !== 'standard' && matchType !== 'mortSubite' && matchType !== 'chaos' && matchType !== 'twoPoints') return;

        let matchedPlayerId: string | null = null;
        let matchedPlayerSocket: Socket | null = null;
        for (let [waitingPlayerId, [waitingSocket, waitingMatchType]] of this.waitingPlayers.entries()) {
            if (waitingMatchType === matchType) {
                matchedPlayerId = waitingPlayerId;
                matchedPlayerSocket = waitingSocket;
                break;
            }
        }

        if (matchedPlayerId) {
            const waitingPlayer = Array.from(this.waitingPlayers.keys())[0];
            this.waitingPlayers.delete(matchedPlayerId);

            this.startGame(true, String(client.user.id), waitingPlayer, client, matchedPlayerSocket, matchType);
        } else {
            this.waitingPlayers.set(String(client.user.id), [client, matchType]);
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

        if (!client.user) return;

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

        const theRoomTheUserIsIn = [...client.rooms].find(room => room !== client.id);
        if (!theRoomTheUserIsIn) return;
        
        const gameSession = this.gameSessions[theRoomTheUserIsIn];
        if (!gameSession) return;

        gameSession.movePaddleUp(String(client.user.id));

    }

    @SubscribeMessage('movePaddleDown')
    async handleMovePaddleDown(
        @ConnectedSocket() client: SocketWithUser,
    ): Promise<void> {

        const theRoomTheUserIsIn = [...client.rooms].find(room => room !== client.id);
        if (!theRoomTheUserIsIn) return;

        const gameSession = this.gameSessions[theRoomTheUserIsIn];
        if (!gameSession) return;

        gameSession.movePaddleDown(String(client.user.id));

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
