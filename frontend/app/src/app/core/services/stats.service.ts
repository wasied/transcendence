import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Stat } from "../models/stat.model"; 
import { AuthHttpClient } from 'src/app/auth-http-client';

@Injectable ({
	providedIn: 'root'
})
export class StatsService {

	constructor (private authHttp: AuthHttpClient) {}
	
	private apiUrl : string = 'http://localhost:8080/stats';

	/* READ */

	getStats(): Observable<Stat> {
		const endpoint: string = `${this.apiUrl}`;

		return this.authHttp.get<Stat>(endpoint);
	}
	
	getStatsFromUserById(userId: number) : Observable<Stat> {
		const endpoint: string = `${this.apiUrl}/${userId}`;
		
		return this.authHttp.get<Stat>(endpoint);
	}
}
