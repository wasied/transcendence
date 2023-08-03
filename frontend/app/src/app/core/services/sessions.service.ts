import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Session } from "../models/session.model"; 

@Injectable ({
	providedIn: 'root'
})
export class SessionsService {

	constructor (private http: HttpClient) {};

	private hardcodedSessions: Session[] = [{
		id: 1,
		autoMatching: true,
		customization: true,
		ended: false,
		winner_id: 1,
		createdAt: new Date(),
		updatedAt: new Date()
	}];

	getHarcodedSessions(): Observable<Session[]> {
		return of(this.hardcodedSessions);
	}
	
	
	// with DB
	
	private apiURL = 'http://localhost:3000/sessions'; // change this

	// return all the game sessions
	getAllSessions() : Observable<Session[]> {
		const endpoint: string = `${this.apiURL}`; // modify that
		
		return this.http.get<Session[]>(endpoint);
	}

	// return one session based on it's id
	getSessionById(id: number) : Observable<Session> {
		const endpoint: string = `${this.apiURL}/${id}`; // modify that

		return this.http.get<Session>(endpoint);
	}

	// Can be use to display all sessions that are currently active, to display in spectator mode menu
	getActiveSessions() : Observable<Session[]> {
		const endpoint: string = `${this.apiURL}`; // modify that
		
		return this.http.get<Session[]>(endpoint, { params: { isEnded: false } });
	}

	// Returns the history of every session where a given player has participated. Used in match history.
	getSessionsHistoryByUserId(userId: number) : Observable<Session[]> {		
		const endpoint: string = `${this.apiURL}`; // modify that
		
		return this.http.get<Session[]>(endpoint);
	}
}
