import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor (private http: HttpClient) {};

	private apiURL: string = 'http://localhost:8080/auth/login'; // change that
	authURL!: string;
	authObs$!: Observable<string>;

	retrieveURL() : Observable<string> {
		return this.http.get<string>(`${this.apiURL}`);
	}

	subscribeObservable() : void {
		this.authObs$.subscribe(value => {
			console.log(value);
			this.authURL = value;
		});
		window.location.href = this.authURL;
	}

	triggerAuth() : void {
		this.authObs$ = this.retrieveURL();
		this.subscribeObservable();
	}
}
