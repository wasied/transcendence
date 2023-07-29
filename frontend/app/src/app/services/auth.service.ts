import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor (private http: HttpClient) {};

	private apiURL: string = 'http://localhost:8080/auth/login'; // change that

	triggerAuth() : void {
		this.http.get<void>(`${this.apiURL}`);
	}
}
