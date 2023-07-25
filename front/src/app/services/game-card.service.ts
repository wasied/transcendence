import { Injectable } from "@angular/core";
import { catchError, forkJoin, map, Observable, of } from "rxjs";
import { Gamecard } from "../models/game-card.model";
import { User } from "../models/user.model";
import { SessionsUser } from "../models/sessions-user.model";
import { UsersService } from "./users.service";
import { Session } from "../models/session.model";
import { SessionsService } from "./sessions.service";
import { SessionsUsersService } from "./sessions-users.service";

@Injectable({
	providedIn: 'root'
})
export class GamecardService {

	constructor (private usersService: UsersService,
				 private sessionsService: SessionsService,
				 private sessionsUsersService: SessionsUsersService) {};

	getAllGameCards(): Observable<Gamecard[]> {
		return forkJoin({
			users: this.usersService.getUsersInActiveSession(),
			sessions: this.sessionsService.getActiveSessions(),
			sessionsUsers: this.sessionsUsersService.getActiveParticipantsSessionUsers()
		}).pipe(map(
			({users, sessions, sessionsUsers}) => 
				sessions.map(session => this.createGameCards(session, users, sessionsUsers))
			),
			catchError(error => {
				console.error(error);
				return of([]);
			})
		);
	}
	
	private createGameCards(session: Session, users: User[], sessionUsers: SessionsUser[]): Gamecard
	{	
		const relevantSessionUsers = sessionUsers.filter(sessionUser => sessionUser.session_id === session.id);
		const usersInSession = relevantSessionUsers.map(sessionUser => {
			const user = users.find(user => user.id === sessionUser.user_id);

			if (!user) {
				throw new Error(`User with ID ${sessionUser.user_id} not found!`);
			}
			return user;
		});

		if (!usersInSession || usersInSession.length != 2)
			throw new Error('user not found !'); // change the message

		return new Gamecard(
			usersInSession[0].id,
			usersInSession[1].id,
			usersInSession[0].username,
			usersInSession[1].username
		);
	}
}
