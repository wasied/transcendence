import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private doubleAuthActivated: boolean = false;
	private apiURL: string = 'http://localhost:8080/auth';
	authObs$!: Observable<any>;

	constructor (
		private http: HttpClient,
		private authHttp: AuthHttpClient
	) {}

	storeTokenOnLocalSession(token: string) : void {
		localStorage.setItem('authToken', token);
	}

	getTokenOnLocalSession() : string | null {
		return localStorage.getItem('authToken');
	}

	delTokenFromLocalSession() : void {
		localStorage.removeItem('authToken');
	}
	
	async change2faStatus() : Promise<any> {
		this.doubleAuthActivated = !this.doubleAuthActivated;

		var headers = new HttpHeaders();
		headers = headers.append('Authorization', `Bearer ${this.getTokenOnLocalSession()}`);

		if (this.doubleAuthActivated) {
			const response = await this.authHttp.get<{ success: boolean, /*qrCodeUrl: string,*/
				secret: string }>(`${this.apiURL}/2fa/enable`/*, { headers: headers }*/).toPromise();
			if (!response)
				return ; // handle err
			console.log(response.secret);

			return response;
		}
		else
			return await this.authHttp.get<{ success: boolean, /*qrCodeUrl: string,*/
				secret: string }>(`${this.apiURL}/2fa/disable`/*, { headers: headers }*/).toPromise();
	}

	handle2fa(userId: number, code: string) : Observable<{ success: boolean, url: string }> {
		return this.http.post<{ success: boolean, url: string }>(`${this.apiURL}/2fa`, {
			id: userId,
			code: code
		});
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
