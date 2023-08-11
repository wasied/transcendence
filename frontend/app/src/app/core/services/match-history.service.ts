import { Injectable } from "@angular/core";
import { Observable, forkJoin, map, catchError, of } from "rxjs";
import { MatchHistory } from "../models/match-history.model";
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

	matchHistory$!: Observable<MatchHistory[]>

	constructor (
		private usersService: UsersService,
		private sessionsService: SessionsService,
		private sessionsUsersService: SessionsUsersService
	) {}

	getUserHistory(userId: number): Observable<MatchHistory[]> {
		const endpoint = `http://localhost:8080/sessions/history/${userId}`;

		this. matchHistory$ = this.authHttp.get<MatchHistory[]>(endpoint);
	}
}
