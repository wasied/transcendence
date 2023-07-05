import { Injectable } from "@angular/core";
import { catchError, forkJoin, map, Observable, of } from "rxjs";
import { Gamecard } from "../models/game-card.model";
import { Session } from "../models/session.model";
import { User } from "../models/user.model";
import { SessionsService } from "./sessions.service";
import { UsersService } from "./users.service";

@Injectable({
	providedIn: 'root'
})
export class GamecardService {

	constructor (private sessionsService: SessionsService,
				 private usersService: UsersService) {};

	getGameCards(): Observable<Gamecard[]> {
		return forkJoin({
			users: this.usersService.getAllUsers(),
			sessions: this.sessionsService.getAllSessions()
		}).pipe(
			map(({users, sessions}) => 
				sessions.filter(session => session.ended === false)
				.map(session => this.createGameCard(session, users))
			),
			catchError(error => {
				console.error(error);
				return of([]);
			})
		);
	}
	
	private createGameCard(session: Session, users: User[]): Gamecard
	{	
		const firstPlayer = users.find(user => user.id === session.id);
		const secondPlayer = users.find(user => user.id === session.id);

		if (!firstPlayer || !secondPlayer)
			throw new Error('user not found !'); // change the message

		return new Gamecard(
			firstPlayer.id,
			secondPlayer.id,
			firstPlayer.username,
			secondPlayer.username
		);
	}
}
