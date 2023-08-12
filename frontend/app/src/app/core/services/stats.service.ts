import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Stat } from "../models/stat.model"; 
import { AuthHttpClient } from 'src/app/auth-http-client';
import { environment } from "src/environments/environment";

@Injectable ({
	providedIn: 'root'
})
export class StatsService {

	constructor (private authHttp: AuthHttpClient) {}

	private hardcodedStats: Stat[] = [{
		wins: 13,
		losses: 7,
		games_played: 20,
		win_ratio: '0.78'
	}];
	
	getHardcodedStats() : Observable<Stat[]> {
		return of(this.hardcodedStats);
	}

	getHardcodedStat() : Observable<Stat> { // placeholder
		return of(this.hardcodedStats[0]);
	}

	// with DB
	
	private apiUrl : string = `${environment.appUrl}:${environment.backendAPIPort}/stats`;

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
