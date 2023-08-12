import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { httpErrorHandler } from 'src/app/http-error-handler';
import QRCode from 'qrcode';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private doubleAuthActivated: boolean = false;
	private apiURL: string = 'http://localhost:8080/auth';
	authObs$!: Observable<any>;

	constructor (
		private http: HttpClient,
		private authHttp: AuthHttpClient,
		private router: Router
	) {}

	/* AUTH USING 42 API */

	async isAuthenticated(): Promise<boolean> {
		if (!this.getTokenOnLocalSession())
			return false;
		const authenticated: boolean = await this.authHttp.get<void>(`${this.apiURL}/isAuthenticated`).toPromise()
			.then(response => { return true; })
			.catch(error => { return false; });

		return authenticated;
	}

	retrieveURL() : Observable<{ url: string }> {
		const endpoint: string = `${this.apiURL}/url`;
		
		return this.http.get<{ url: string }>(endpoint);
	}

	async triggerAuth() : Promise<void> {
		this.authObs$ = this.retrieveURL();
		const authURL = await this.authObs$.toPromise()
			.then(response => { return response.url; })
			.catch(httpErrorHandler);
		if (authURL)
			window.location.href = authURL;
	}

	/* 2FA */

	async change2faStatus() : Promise<{ success: boolean, qrCodeUrl?: string, secret?: string }> {
		this.doubleAuthActivated = !this.doubleAuthActivated;

		if (this.doubleAuthActivated) {
			const response = await this.authHttp.get<{ success: boolean, otpAuthUrl: string,
				secret: string }>(`${this.apiURL}/2fa/enable`).toPromise()
				.catch(httpErrorHandler);
			if (!response) {
				httpErrorHandler();
				return { success: false };
			}
			const qrCodeUrl = await QRCode.toDataURL(response.otpAuthUrl)
				.catch((err: any) => { return undefined; });
			console.log(response.secret);
			console.log(qrCodeUrl);

			return {
				success: response.success,
				qrCodeUrl: qrCodeUrl,
				secret: response.secret
			};
		}
		else {
			const response = await this.authHttp.get<{ success: boolean, otpAuthUrl: string,
				secret: string }>(`${this.apiURL}/2fa/disable`).toPromise()
				.catch(httpErrorHandler);
			if (response && response.success)
				return { success: true };
			else
				return { success: false };
		}
	}

	handle2fa(userId: number, code: string) : Observable<{ success: boolean, url: string }> {
		return this.http.post<{ success: boolean, url: string }>(`${this.apiURL}/2fa`, {
			id: userId,
			code: code
		});
	}

	/* ACCESS USER ID IN LOCAL STORAGE */

	storeTokenOnLocalSession(token: string) : void {
		localStorage.setItem('authToken', token);
	}

	getTokenOnLocalSession() : string | null {
		return localStorage.getItem('authToken');
	}

	delTokenFromLocalSession() : void {
		localStorage.removeItem('authToken');
	}
}
