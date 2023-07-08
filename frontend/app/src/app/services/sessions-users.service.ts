import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionsUser } from "../models/sessions-user.model";

@Injectable ({
	providedIn: 'root'
})
export class SessionsUsersService {

	constructor (private http: HttpClient) {};

	private apiUrl: string = ''; // change this

	getAllSessionsUsers() : Observable<SessionsUser[]> {
		return this.http.get<SessionsUser[]>(`${this.apiUrl}`);
	}

	getSessionUserById(id: number) : Observable<SessionsUser> {
		return this.http.get<SessionsUser>(`${this.apiUrl}/${id}`);
	}

	getActiveSessionUsers() : Observable<SessionsUser[]> {
		return this.http.get<SessionsUser[]>(`${this.apiUrl}`, {params: { alive: true } });
	}

	getActiveParticipantsSessionUsers() : Observable<SessionsUser[]> {
		return this.http.get<SessionsUser[]>(`${this.apiUrl}`, {params: { alive: true, spectator: false}} );
	}
}
