import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SessionsUser } from "../models/sessions-user.model"; 

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
	
	private apiUrl: string = 'http://localhost:3000/sessions_users'; // change this

	// retrieve all session users
	getAllSessionsUsers() : Observable<SessionsUser[]> {
		return this.http.get<SessionsUser[]>(`${this.apiUrl}`);
	}

	// retrieve a sessionUser by it's id
	getSessionUserById(id: number) : Observable<SessionsUser> {
		return this.http.get<SessionsUser>(`${this.apiUrl}/${id}`);
	}

	// used for display game history (returns sessionUsers that had compete against a given user 
	// (or are this user))
	getSessionUsersImplyingGivenUser(userId: number) : Observable<SessionsUser[]> {
		return this.http.get<SessionsUser[]>(`${this.apiUrl}`);
	}

	// used to display that are currently on a game, as players but not spectators
	getActiveParticipantsSessionUsers() : Observable<SessionsUser[]> {
		return this.http.get<SessionsUser[]>(`${this.apiUrl}`, { params: { alive: true, spectator: false }} );
	}
}
