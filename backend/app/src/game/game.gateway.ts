import { Request } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RequestWithUser } from '../utils/RequestWithUser';

@WebSocketGateway({ cors: true, namespace: "pong" })
export class PongGameGateway {
    @WebSocketServer() server: Server;

    private waitingPlayers: Map<string, Socket> = new Map();
    private playersInvitations = new Map<string, Map<string, Socket>>();
    private gameSessions = {};
    private spectators = {};    

    private performGameLogic(gameData: any): void {
        this.updateBallPosition(gameData);
    }

    private updateBallPosition(gameData:any): void {
        gameData.ball.x += gameData.ball.dx;
        gameData.ball.y += gameData.ball.dy;

        // Collision with top and bottom
        if (gameData.ball.y + gameData.ball.dy < gameData.ball.radius || gameData.ball.y + gameData.ball.dy > gameData.canvasHeight - gameData.ball.radius) {
            gameData.ball.dy = -gameData.ball.dy;
        }

        // Collision with left and right
        if (gameData.ball.x + gameData.ball.dx < gameData.ball.radius || gameData.ball.x + gameData.ball.dx > gameData.canvasWidth - gameData.ball.radius) {
            gameData.ball.dx = -gameData.ball.dx;
        }
    }

    private populateGameData(userId: string, gameData: any): any {
        if (!gameData) return (null);

        const copiedGameData = JSON.parse(JSON.stringify(gameData));
        if (!copiedGameData) return null;

        if (userId === copiedGameData.playerLeft) {
            copiedGameData.localPlayerIsLeft = true;
            copiedGameData.opponentId = copiedGameData.playerRight;
        } else {
            copiedGameData.localPlayerIsLeft = false;
            copiedGameData.opponentId = copiedGameData.playerLeft;
        }
        return (copiedGameData);
    }

    private convertGameDataToPercentages(gameData: any): any {
        if (!gameData) return (null);

        const copiedGameData = JSON.parse(JSON.stringify(gameData));
        if (!copiedGameData) return null;

        copiedGameData.ball.x = copiedGameData.ball.x / copiedGameData.canvasWidth;
        copiedGameData.ball.y = copiedGameData.ball.y / copiedGameData.canvasHeight;
        copiedGameData.ball.radius = copiedGameData.ball.radius / copiedGameData.canvasHeight;
    
        return (copiedGameData);
    }

    // Pair these players in a game
    private startGame(isPublic: boolean, playerOneId: string, playerTwoId: string, playerOneSocket: Socket, playerTwoSocket: Socket): void {
        const gameSessionId = `${isPublic ? "public" : "private"}-${playerOneId}-${playerTwoId}`;

        const gameInterval = setInterval(() => {
            this.performGameLogic(this.gameSessions[gameSessionId]);
            this.server.to(gameSessionId).emit('gameUpdate', this.convertGameDataToPercentages(this.gameSessions[gameSessionId]));
        }, 1000 / 60);

        this.gameSessions[gameSessionId] = {
            playerLeft: playerOneId,
            playerRight: playerTwoId,
            canvasWidth: 1920,
            canvasHeight: 1080,
            ball: {
                x: 0,
                y: 0,
                dx: 0,
                dy: 0,
                radius: 10
            },
            paddleLeft: {
                y: 0 // WARNING: This is a percentage already
            },
            paddleRight: {
                y: 0 // WARNING: This is a percentage already
            },
            playerLeftScore: 0,
            playerRightScore: 0,
            gameInterval: gameInterval
        };

        playerOneSocket.join(gameSessionId);
        playerTwoSocket.join(gameSessionId);

        playerOneSocket.emit('gameStarted', this.convertGameDataToPercentages(this.populateGameData(playerTwoId, this.gameSessions[gameSessionId])));
        playerTwoSocket.emit('gameStarted', this.convertGameDataToPercentages(this.populateGameData(playerOneId, this.gameSessions[gameSessionId])));
    }

    // Explode game id
    private explodeGameId(gameId: string): any {
        const explodedGameId = gameId.split('-');
        if (explodedGameId.length !== 3) return (null);

        return ({
            isPublic: explodedGameId[0] === "public",
            playerOneId: explodedGameId[1],
            playerTwoId: explodedGameId[2]
        });
    }

    // When a player joins the matchmaking
    @SubscribeMessage('joinMatchmaking')
    async handleJoinMatchmaking(
        @ConnectedSocket() client: Socket,
        @Request() request: RequestWithUser
    ): Promise<void> {

        // Check if the user is already in a room
        const theRoomTheUserIsIn = Object.keys(client.rooms).filter(room => room !== client.id)[0];
        if (theRoomTheUserIsIn) return;

        const waitingPlayerSocket = Array.from(this.waitingPlayers.values())[0];
        if (waitingPlayerSocket) {
            const waitingPlayer = Array.from(this.waitingPlayers.keys())[0];
            this.waitingPlayers.delete(waitingPlayerSocket.id);

            this.startGame(true, String(request.user.id), waitingPlayer, client, waitingPlayerSocket);
        } else {
            this.waitingPlayers.set(String(request.user.id), client);
        }

    }

    // When a player joins a game as a spectator
    @SubscribeMessage('spectateGame')
    async handleSpectateGame(
        @ConnectedSocket() client: Socket,
        @Request() request: RequestWithUser,
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
        
        this.spectators[request.user.id] = this.spectators[request.user.id] || {};
        this.spectators[request.user.id] = [gameSessionId, client] 

        client.join(gameSessionId);

    }

    @SubscribeMessage('disconnect')
    async handleDisconnect(
        @ConnectedSocket() client: Socket,
        @Request() request: RequestWithUser
    ): Promise<void> {

        const theRoomTheUserIsIn = Object.keys(client.rooms).filter(room => room !== client.id)[0];
        if (theRoomTheUserIsIn) {
            
            const gameSession = this.gameSessions[theRoomTheUserIsIn];
            if (gameSession) {
                this.server.to(theRoomTheUserIsIn).emit('gameEnded', this.convertGameDataToPercentages(gameSession));
                client.leave(theRoomTheUserIsIn);

                clearInterval(gameSession.gameInterval);
                delete this.gameSessions[theRoomTheUserIsIn];
            }

            for (const spectatorData of Object.values(this.spectators)) {
                if (spectatorData[0] === theRoomTheUserIsIn) {
                    spectatorData[1].leave(spectatorData[0]);
                    delete this.spectators[request.user.id];
                }
            }

        } else if (this.waitingPlayers.has(String(request.user.id))) {
            this.waitingPlayers.delete(String(request.user.id));
        }

        // Delete all invitations to this player
        if (this.playersInvitations[String(request.user.id)]) {
            delete this.playersInvitations[String(request.user.id)];
        }

        // Delete all invitations sent to another players
        for (const inviterMap of Object.values(this.playersInvitations)) {
            if (inviterMap.has(String(request.user.id))) {
                inviterMap.delete(String(request.user.id));
            }
        }
    }

    // Transmit to other players when they updated the paddle position
    @SubscribeMessage('paddlePositionUpdate')
    async handlePaddlePositionUpdate(
        @ConnectedSocket() client: Socket,
        @Request() request: RequestWithUser,
        @MessageBody() body: any
    ): Promise<void> {

        const theRoomTheUserIsIn = Object.keys(client.rooms).filter(room => room !== client.id)[0];
        if (!theRoomTheUserIsIn) return;

        const gameSession = this.gameSessions[theRoomTheUserIsIn];
        if (!gameSession) return;

        const populatedGameData = this.populateGameData(String(request.user.id), gameSession);
        if (!populatedGameData) return;

        const paddleY = body.paddleY;
        if (paddleY < 0 || paddleY > 1) return;
        
        if (populatedGameData.localPlayerIsLeft) {
            gameSession.paddleLeft.y = paddleY;
        } else {
            gameSession.paddleRight.y = paddleY;
        }

        const opponentId = populatedGameData.opponentId;
        client.to(opponentId).emit('paddlePositionUpdate', this.convertGameDataToPercentages(gameSession));

        for (const spectatorData of Object.values(this.spectators)) {
            if (spectatorData[0] === theRoomTheUserIsIn) {
                spectatorData[1].emit('paddlePositionUpdate', this.convertGameDataToPercentages(gameSession));
            }
        }

    }

    // Invite a player to a game
    @SubscribeMessage('invitePlayer')
    async handleInvitePlayer(
        @ConnectedSocket() client: Socket,
        @Request() request: RequestWithUser,
        @MessageBody() body: any
    ): Promise<void> {

        const opponentId = String(body.opponentId);
        if (!opponentId) return;

        this.playersInvitations[opponentId] = this.playersInvitations[opponentId] || (new Map());
        this.playersInvitations[opponentId].set(String(request.user.id), client);

    }

    // Accept an invitation
    @SubscribeMessage('acceptInvitation')
    async handleAcceptInvitation(
        @ConnectedSocket() client: Socket,
        @Request() request: RequestWithUser,
        @MessageBody() body: any
    ): Promise<void> {

        const opponentId = String(body.opponentId);
        if (!opponentId) return;

        if (this.playersInvitations[String(request.user.id)].has(opponentId)) {
            const opponentSocket = this.playersInvitations[String(request.user.id)].get(opponentId);

            this.playersInvitations[String(request.user.id)].delete(opponentId);
            if (this.playersInvitations[String(request.user.id)].size === 0) {
                delete this.playersInvitations[String(request.user.id)];
            }

            this.startGame(false, String(request.user.id), opponentId, client, opponentSocket);
        }

    }

}
