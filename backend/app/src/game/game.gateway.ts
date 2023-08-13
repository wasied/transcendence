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

    // Map<playerId, [socket, matchType]>
    private waitingPlayers: Map<string, [Socket, string]> = new Map();
    // Map<playerId, [socket, chatroomId]>
    private privateGames: Map<string, [Socket, string]> = new Map();
    private gameSessions = {};
    private spectators = {};

    // Convert data to a client-friendly format
    private translateDataForClient(data: any): any {
        return {
            sessionId: data.sessionId,
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

    // Stop a game
    private async stopGame(gameSessionId: string, playerWinnerId: number): Promise<void> {
        const gameInstance = this.gameSessions[gameSessionId];
        if (!gameInstance) return;

        const explodedGameId = this.explodeGameId(gameSessionId);
        if (!explodedGameId) return;

        const playerOneId = parseInt(explodedGameId.playerOneId);
        const playerTwoId = parseInt(explodedGameId.playerTwoId);

        this.sessionsService.end(explodedGameId.sessionId, playerWinnerId === playerOneId ? playerOneId : playerTwoId);
        this.server.to(gameSessionId).emit('gameEnded', this.translateDataForClient(gameInstance.getAllGameData(explodedGameId.sessionId)));

        // Remove all spectators linked to this room
        for (const [spectatorKey, spectatorData] of Object.entries(this.spectators)) {
            if (spectatorData[0] === gameSessionId) {
                spectatorData[1].leave(gameSessionId);
                delete this.spectators[spectatorKey];
            }
        }

        if (gameInstance.getTimerId() !== -1)
            clearInterval(gameInstance.getTimerId());

        this.server.to(gameSessionId).disconnectSockets(true);
        delete this.gameSessions[gameSessionId];
    }

    // Pair these players in a game
    private async startGame(isPublic: boolean, playerOneId: string, playerTwoId: string, playerOneSocket: Socket, playerTwoSocket: Socket, matchType: GameData['variant']): Promise<void> {

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
        const gameSessionId = `${isPublic ? 'public' : 'private'}-${playerOneId}-${playerTwoId}-${sessionId}`;

        const intervalId: any = setInterval(() => {

            gameInstance.updateGame();

            const isEnded = gameInstance.isGameEnded();
            if (isEnded)
                return this.stopGame(gameSessionId, gameInstance.getCurrentWinnerId());

            this.server.to(gameSessionId).emit('gameUpdate', this.translateDataForClient(gameInstance.getAllGameData(sessionId)));

        }, 1000 / 60);

        gameInstance.setTimerId(intervalId);
        this.gameSessions[gameSessionId] = gameInstance;

        this.sessionsService.join(sessionId, parseInt(playerOneId), false);
        this.sessionsService.join(sessionId, parseInt(playerTwoId), false);

        playerOneSocket.join(gameSessionId);
        playerTwoSocket.join(gameSessionId);

        this.server.to(gameSessionId).emit('gameStarted', this.translateDataForClient(gameInstance.getAllGameData(sessionId)));

    }

    // Explode game id
    private explodeGameId(gameId: string): any {
        const explodedGameId = gameId.split('-');
        if (explodedGameId.length !== 4) return (null);

        return ({
            isPublic: explodedGameId[0] === 'public',
            playerOneId: explodedGameId[1],
            playerTwoId: explodedGameId[2],
            sessionId: explodedGameId[3]
        });
    }

    // When a player joins the matchmaking
    @SubscribeMessage('joinMatchmaking')
    async handleJoinMatchmaking(
        @ConnectedSocket() client: SocketWithUser,
        @MessageBody() body: any
    ): Promise<void> {

        // Check if the user is already in a room
        const theRoomTheUserIsIn = [...client.rooms].find(room => room !== client.id);
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

    // When a player joins a private game
    @SubscribeMessage('joinPrivateGame')
    async handleJoinPrivateGame(
        @ConnectedSocket() client: SocketWithUser,
        @MessageBody() body: any
    ): Promise<void> {

        const theRoomTheUserIsIn = [...client.rooms].find(room => room !== client.id);
        if (theRoomTheUserIsIn) return;
    
        const chatroomId = body.chatroomId;
        if (!chatroomId) return;
    
        let matchedPlayerId: string | null = null;
        let matchedPlayerSocket: Socket | null = null;
        
        // Search for another player waiting in the same chatroom
        for (let [waitingPlayerId, [waitingSocket, waitingChatroomId]] of this.privateGames.entries()) {
            if (waitingChatroomId === chatroomId) {
                matchedPlayerId = waitingPlayerId;
                matchedPlayerSocket = waitingSocket;
                break;
            }
        }
    
        if (matchedPlayerId) {
            this.privateGames.delete(matchedPlayerId);
            this.startGame(false, String(client.user.id), matchedPlayerId, client, matchedPlayerSocket, "standard");
        } else {
            this.privateGames.set(String(client.user.id), [client, chatroomId]);
        }
    }

    // When a player joins a game as a spectator
    @SubscribeMessage('startSpectating')
    async handleStartSpectating(
        @ConnectedSocket() client: SocketWithUser,
        @MessageBody() body: any
    ): Promise<void> {

        const theRoomTheUserIsIn = [...client.rooms].find(room => room !== client.id);
        if (theRoomTheUserIsIn) return;

        const spectatedUserId = body.spectatingUserId;
        if (!spectatedUserId) return;

        let gameSessionId = null;
        let dataFetched = null;
        for (const gameId of Object.keys(this.gameSessions)) {

            const extractedData = this.explodeGameId(gameId);
            if (!extractedData) continue;

            if (parseInt(extractedData.playerOneId) === parseInt(spectatedUserId) || parseInt(extractedData.playerTwoId) === parseInt(spectatedUserId)) {
                gameSessionId = gameId;
                dataFetched = extractedData;
                break;
            }

        }
        if (!gameSessionId || !dataFetched) return;

        this.spectators[client.user.id] = this.spectators[client.user.id] || {};
        this.spectators[client.user.id] = [gameSessionId, client]

        this.sessionsService.join(dataFetched.sessionId, client.user.id, true);
        client.join(gameSessionId);

    }

    @SubscribeMessage('leaveGame')
    async handleLeaveGame(
        @ConnectedSocket() client: SocketWithUser,
    ): Promise<void> {

        const theRoomTheUserIsIn = [...client.rooms].find(room => room !== client.id);
        if (theRoomTheUserIsIn) {

            const gameInstance = this.gameSessions[theRoomTheUserIsIn];
            if (gameInstance) {

                if (gameInstance.isIdInGame(String(client.user.id))) {
                    const opponentUserId = gameInstance.getOpponentId(String(client.user.id));
                    this.stopGame(theRoomTheUserIsIn, opponentUserId);
                } else {
                    client.leave(theRoomTheUserIsIn);
                    delete this.spectators[String(client.user.id)];
                }

            }

        } else if (this.waitingPlayers.has(String(client.user.id))) {
            this.waitingPlayers.delete(String(client.user.id));
        }

    }

    @SubscribeMessage('movePaddleUp')
    async handleMovePaddleUp(
        @ConnectedSocket() client: SocketWithUser,
    ): Promise<void> {

        const theRoomTheUserIsIn = [...client.rooms].find(room => room !== client.id);
        if (!theRoomTheUserIsIn) return;

        const gameInstance = this.gameSessions[theRoomTheUserIsIn];
        if (!gameInstance) return;
        if (!gameInstance.isIdInGame(String(client.user.id))) return;

        gameInstance.movePaddleUp(String(client.user.id));

    }

    @SubscribeMessage('movePaddleDown')
    async handleMovePaddleDown(
        @ConnectedSocket() client: SocketWithUser,
    ): Promise<void> {

        const theRoomTheUserIsIn = [...client.rooms].find(room => room !== client.id);
        if (!theRoomTheUserIsIn) return;

        const gameInstance = this.gameSessions[theRoomTheUserIsIn];
        if (!gameInstance) return;
        if (!gameInstance.isIdInGame(String(client.user.id))) return;

        gameInstance.movePaddleDown(String(client.user.id));

    }

}
