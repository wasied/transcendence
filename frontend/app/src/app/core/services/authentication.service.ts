import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { httpErrorHandler } from 'src/app/http-error-handler';
import { environment } from 'src/environments/environment';
import QRCode from 'qrcode';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private doubleAuthActivated: boolean = false;
	private apiURL: string = `${environment.appUrl}:${environment.backendAPIPort}/auth`;
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

	async enable2faStatus(): Promise<{ success: boolean, qrCodeUrl: string, secret: string }> {
		const response = await this.authHttp.get<{ success: boolean, otpAuthUrl: string,
			secret: string }>(`${this.apiURL}/2fa/enable`).toPromise()
			.catch(httpErrorHandler);
		if (!response) {
			httpErrorHandler();
			return { success: false };
		}
		const qrCodeUrl = await QRCode.toDataURL(response.otpAuthUrl)
			.catch((err: any) => { return undefined; });

		return {
			success: response.success,
			qrCodeUrl: qrCodeUrl,
			secret: response.secret
		};
	}

	async disable2faStatus(): Promise<boolean> {
		const response = await this.authHttp.get<{ success: boolean, otpAuthUrl: string,
			secret: string }>(`${this.apiURL}/2fa/disable`).toPromise()
			.catch(httpErrorHandler);
		return (response && response.success);
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
