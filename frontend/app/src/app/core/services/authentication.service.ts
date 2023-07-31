import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private doubleAuthActivated: boolean = false;
	private apiURL: string = 'http://localhost:8080/auth';
	authURL!: string;
	authObs$!: Observable<any>;

	constructor (private http: HttpClient) {}
	
	// should activate/deactivate 2fa, returning a status : success on success
	change2faStatus() : Observable<{status: string}> {
		this.doubleAuthActivated = !this.doubleAuthActivated;
		const body = { myBoolean: this.doubleAuthActivated };

		return this.http.post<{ status: string }>('http://localhost:3000/my-endpoint', body);
	}

	// send code to the back to 2fa
	sendAuthData(authData: string) : Observable<{status: string}> {
		return this.http.post<{status: string}>('replace-by-endpoint', authData);
	}

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