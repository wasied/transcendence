import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Session } from "../models/session.model";

@Injectable ({
	providedIn: 'root'
})
export class SessionsService {

	constructor (private http: HttpClient) {};

	private apiURL = 'http://localhost:3000/sessions';

	getAllSessions() : Observable<Session[]> {
		return this.http.get<Session[]>(`${this.apiURL}`);
	}

	getSessionById(id: number) : Observable<Session> {
		return this.http.get<Session>(`${this.apiURL}/${id}`);
	}
}
