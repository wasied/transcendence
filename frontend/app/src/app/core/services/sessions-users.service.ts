import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SessionsUser } from "../models/sessions-user.model"; 
import { environment } from "src/environments/environment";

@Injectable ({
	providedIn: 'root'
})
export class SessionsUsersService {

	constructor (private http: HttpClient) {};

	private hardcodedSessionUsers: SessionsUser[] = [{
		id: 1,
		user_id: 1,
		session_id: 1,
		spectator: false,
		alive: true,
		score: 8,
		createdAt: new Date()
	}];
	
	getHardcodedSessionUsers(): Observable<SessionsUser[]> {
		return of(this.hardcodedSessionUsers);
	}

	// with observables
	
	private apiUrl: string = `${environment.appUrl}:${environment.backendAPIPort}/sessions_users`;


	/* CREATE */

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

	/* UPDATE */

	/* DELETE */
}
