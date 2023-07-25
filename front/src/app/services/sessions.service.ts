import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Session } from "../models/session.model";

@Injectable ({
	providedIn: 'root'
})
export class SessionsService {

	constructor (private http: HttpClient) {};

	private apiURL = 'http://localhost:3000/sessions'; // change this

	getAllSessions() : Observable<Session[]> {
		return this.http.get<Session[]>(`${this.apiURL}`);
	}

	// can be use to display all sessions that are currently active, to display in spectator mode menu
	getActiveSessions() : Observable<Session[]> {
		return this.http.get<Session[]>(`${this.apiURL}`, { params: { isEnded: false } });
	}

	getSessionById(id: number) : Observable<Session> {
		return this.http.get<Session>(`${this.apiURL}/${id}`);
	}

	// used to display history of a given user
	getSessionsHistoryByUserId(userId: number) : Observable<Session[]> {		
		return this.http.get<Session[]>(`${this.apiURL}`); // change this
	}
}
