import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { Observable } from "rxjs";
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
		private authHttp: AuthHttpClient
	) {}

	/* AUTH USING 42 API */

	async isAuthenticated(): Promise<boolean> {
		if (!this.getTokenOnLocalSession())
			return false;
		try { await this.authHttp.get<void>(`${this.apiURL}/isAuthenticated`).toPromise(); }
		catch { return false; }

		return true;
	}

	retrieveURL() : Observable<{ url: string }> {
		const endpoint: string = `${this.apiURL}/url`;
		
		return this.http.get<{ url: string }>(endpoint);
	}

	async triggerAuth() : Promise<void> {
		this.authObs$ = this.retrieveURL();
		const authURL = (await this.authObs$.toPromise()).url;
		window.location.href = authURL;
	}

	/* 2FA */

	async change2faStatus() : Promise<{ success: boolean, qrCodeUrl?: string, secret?: string }> {
		this.doubleAuthActivated = !this.doubleAuthActivated;

		if (this.doubleAuthActivated) {
			const response = await this.authHttp.get<{ success: boolean, otpAuthUrl: string,
				secret: string }>(`${this.apiURL}/2fa/enable`).toPromise();
			if (!response)
				return { success: false }; // handle err
			const qrCodeUrl = await QRCode.toDataURL(response.otpAuthUrl)
			.then((imageUrl: string) => { return imageUrl; })
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
				secret: string }>(`${this.apiURL}/2fa/disable`).toPromise();
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
