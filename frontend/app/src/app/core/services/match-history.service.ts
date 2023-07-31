import { Injectable } from "@angular/core";
import { Observable, forkJoin, map, catchError, of } from "rxjs";
import { GameHistory } from "../models/game-history.model";
import { SessionsService } from "./sessions.service";
import { Session } from "../models/session.model"; 
import { User } from "../models/user.model"; 
import { UsersService } from "./users.service";
import { SessionsUsersService } from "./sessions-users.service";
import { SessionsUser } from "../models/sessions-user.model"; 

@Injectable({
	providedIn: 'root'
})
export class MatchHistoryService {

	constructor (private usersService: UsersService,
				 private sessionsService: SessionsService,
				 private sessionsUsersService: SessionsUsersService) {};

	private hardcodedGameHistory: GameHistory[] = [{
		userId: 1,
		opponentId: 2,
		opponentPseudo: 'player 2',
		opponentStatus: 'online',
		yourScore: 7,
		opponentScore: 3
	}];

	getHardcodedGameHistory(): Observable<GameHistory[]> {
		return of(this.hardcodedGameHistory);
	}
	
	// with observables
	
	getGameHistory(playerId: number): Observable<GameHistory[]> {
		
		return forkJoin({
			users: this.usersService.getUsersHavingPlayedWithGivenUser(playerId),
			sessions: this.sessionsService.getSessionsHistoryByUserId(playerId),
			sessionsUsers: this.sessionsUsersService.getSessionUsersImplyingGivenUser(playerId)
		}).pipe(map(
			({ users, sessionsUsers , sessions }) => 
				sessions.map(session => this.createGameHistory(session, sessionsUsers, users))
			),
			catchError(error => {
				console.error(error);
				return of([]);
			})
		) as Observable<GameHistory[]>;
	}

	private createGameHistory(session: Session, sessionsUsers: SessionsUser[] , users: User[]): GameHistory
	{	
		const relevantSessionsUsers = sessionsUsers.filter(sessionUser => sessionUser.session_id === session.id);

		if (!relevantSessionsUsers) {
			throw new Error(`User with ID not found!`);
		}

		const usersInSession = relevantSessionsUsers.map(sessionUser => {
			const user = users.find(user => user.id === sessionUser.user_id);

			if (!user) {
				throw new Error(`User with ID ${sessionUser.user_id} not found!`);
			}
			return user;
		});

		if (!usersInSession || usersInSession.length != 2)
			throw new Error('user not found !'); // change the message
		
		return new GameHistory(
			usersInSession[0].id,
			usersInSession[1].id,
			usersInSession[0].username,
			usersInSession[1].username,
			relevantSessionsUsers[0].score,
			relevantSessionsUsers[1].score
		);
	}
}
