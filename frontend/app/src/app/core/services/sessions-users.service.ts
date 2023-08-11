import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionsUser } from "../models/sessions-user.model"; 

@Injectable ({
	providedIn: 'root'
})
export class SessionsUsersService {

	constructor (private http: HttpClient) {};

	private apiUrl: string = 'http://localhost:3000/sessions_users'; // change this

	/* READ */

	// retrieve all session users
	getAllSessionsUsers() : Observable<SessionsUser[]> {
		const endpoint: string = `${this.apiUrl}`; // modify that
		
		return this.http.get<SessionsUser[]>(endpoint);
	}

	// retrieve a sessionUser by it's id
	getSessionUserById(id: number) : Observable<SessionsUser> {
		const endpoint: string = `${this.apiUrl}/${id}`; // modify that
		
		return this.http.get<SessionsUser>(endpoint);
	}

	// used for display game history (returns sessionUsers that had compete against a given user 
	// (or are this user))
	getSessionUsersImplyingGivenUser(userId: number) : Observable<SessionsUser[]> {
		const endpoint: string = `${this.apiUrl}`; // modify that
		
		return this.http.get<SessionsUser[]>(endpoint);
	}

	// used to display that are currently on a game, as players but not spectators (use to games-view)
	getActiveParticipantsSessionUsers() : Observable<SessionsUser[]> {
		const endpoint: string = `${this.apiUrl}`; // modify that
		
		return this.http.get<SessionsUser[]>(endpoint, { params: { alive: true, spectator: false }} );
	}
}
