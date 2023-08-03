import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private authToken42: string | null = null;
	private doubleAuthActivated: boolean = false;
	private apiURL: string = 'http://localhost:8080/auth';
	authURL!: string;
	authObs$!: Observable<any>;

	constructor (private http: HttpClient) {}

	getAuthToken42() : string | null {
		return this.authToken42;
	}

	rmAuthToken42() : void {
		this.authToken42 = null;
	}
	
	storeAuthToken42(token: string) : void {
		if (!this.authToken42) {
			this.authToken42 = token;
		} else {
			// raise error here
		}
		console.log('stored token is : ', this.authToken42);
	}

	change2faStatus() : Observable<{qrAvailable: boolean, url: string}> {
		this.doubleAuthActivated = !this.doubleAuthActivated;

		return this.http.post<{qrAvailable: boolean, url: string}>('http://localhost:3000/my-endpoint', body);
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
