import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private doubleAuthActivated: boolean = false;
	private apiURL: string = 'http://localhost:8080/auth';
	authObs$!: Observable<any>;

	constructor (private http: HttpClient) {}
	
	change2faStatus() : Promise<Observable<{ success: boolean, qrCodeUrl: string, secret: string }> > {
		this.doubleAuthActivated = !this.doubleAuthActivated;

		if (this.doubleAuthActivated)
			return this.http.get<{ success: boolean, qrCodeUrl: string, secret: string }>(`${this.apiURL}/2fa/enable`);
		else
			return this.http.get<{ success: boolean, qrCodeUrl: string, secret: string }>(`${this.apiURL}/2fa/disable`);
	}

	handle2fa(code: string) : Observable<{ success: boolean, url: string }> {
		return this.http.post<{ success: boolean, url: string }>(`${this.apiURL}/2fa`, code);
	}

	retrieveURL() : Observable<{ url: string }> {
		return this.http.get<{ url: string }>(`${this.apiURL}/url`);
	}

	async triggerAuth() : Promise<void> {
		this.authObs$ = this.retrieveURL();
		const authURL = (await this.authObs$.toPromise()).url;
		window.location.href = authURL;
	}
}
