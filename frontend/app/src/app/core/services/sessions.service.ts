import { Injectable } from "@angular/core";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { Observable, of } from "rxjs";
import { Session } from "../models/session.model"; 
import { environment } from "src/environments/environment";

@Injectable ({
	providedIn: 'root'
})
export class SessionsService {

	constructor (private authHttp: AuthHttpClient) {};

	private hardcodedSessions: Session[] = [{
		id: 1,
		autoMatching: true,
		customization: true,
		ended: false,
		winner_id: 1,
		created_at: "",
		updated_at: ""
	}];

	getHarcodedSessions(): Observable<Session[]> {
		return of(this.hardcodedSessions);
	}
	
	
	// with DB
	
	private apiURL = `${environment.appUrl}:${environment.backendAPIPort}/sessions`;

	// return all the game sessions
	getAllSessions() : Observable<Session[]> {
		const endpoint: string = `${this.apiURL}`;
		
		return this.authHttp.get<Session[]>(endpoint);
	}

	// return one session based on it's id
	getSessionById(id: number) : Observable<Session> {
		const endpoint: string = `${this.apiURL}/${id}`;

		return this.authHttp.get<Session>(endpoint);
	}

	// Can be use to display all sessions that are currently active, to display in spectator mode menu
	getActiveSessions() : Observable<Session[]> {
		const endpoint: string = `${this.apiURL}/active`;
		
		return this.authHttp.get<Session[]>(endpoint);
	}

	// Returns the history of every session where a given player has participated. Used in match history.
	getSessionsHistoryByUserId(userId: number) : Observable<Session[]> {		
		const endpoint: string = `${this.apiURL}/history/user/${userId}`;
		
		return this.authHttp.get<Session[]>(endpoint);
	}
}
