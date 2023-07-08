import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap, forkJoin } from "rxjs";
import { Session } from "../models/session.model";
import { SessionsUser } from "../models/sessions-user.model";

@Injectable ({
	providedIn: 'root'
})
export class SessionsService {

	constructor (private http: HttpClient) {};

	private apiURL = 'http://localhost:3000'; // change this

	getAllSessions() : Observable<Session[]> {
		return this.http.get<Session[]>(`${this.apiURL}`);
	}

	getActiveSessions() : Observable<Session[]> {
		return this.http.get<Session[]>(`${this.apiURL}`, {params: { isEnded: false} });
	}

	getSessionById(id: number) : Observable<Session> {
		return this.http.get<Session>(`${this.apiURL}/${id}`);
	}

	getSessionsByUserId(userId: number): Observable<Session[]> {
		const sessionsUserUrl = `${this.apiURL}/sessions_users?user_id=${userId}`;
	
		return this.http.get<SessionsUser[]>(sessionsUserUrl).pipe(
			switchMap(SessionsUsers =>
				forkJoin(SessionsUsers.map(sessionUser =>
					this.http.get<Session>(`${this.apiURL}/sessions/${sessionUser.session_id}`)
				)) as Observable<Session[]>
			)
		);
	}
}
