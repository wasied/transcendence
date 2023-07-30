import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor (private http: HttpClient, private router: Router) {};

	private apiURL: string = 'http://localhost:8080/auth';
	authURL!: string;
	authObs$!: Observable<any>;

	retrieveURL() : Observable<any> {
		return this.http.get<any>(`${this.apiURL}/url`);
	}

	async subscribeObservable(): Promise<void> {
		this.authURL = (await this.authObs$.toPromise()).url;
		window.location.href = this.authURL;
	}

	triggerAuth() : void {
		this.authObs$ = this.retrieveURL();
		this.subscribeObservable();
	}
}
