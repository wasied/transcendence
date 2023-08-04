import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Stat } from "../models/stat.model"; 
import { HttpClient } from "@angular/common/http";

@Injectable ({
	providedIn: 'root'
})
export class StatsService {

	constructor (private http: HttpClient) {}

	private hardcodedStats: Stat[] = [{
		id: 1,
		userId: 1,
		victories: 13,
		defeats: 7,
		gamesPlayed: 20,
		ratio: 0.78,
		totalTimePlaying: new Date()
	}];
	
	getHardcodedStats() : Observable<Stat[]> {
		return of(this.hardcodedStats);
	}

	getHardcodedStat() : Observable<Stat> { // placeholder
		return of(this.hardcodedStats[0]);
	}

	// with DB
	
	private apiUrl : string = 'http://localhost:3000/stats'; // change that

	/* READ */
	
	getStatsFromUserById(userId: number) : Observable<Stat> {
		const endpoint: string = `${this.apiUrl}/${userId}`; // change that
		
		return this.http.get<Stat>(endpoint);
	}

	/* UPDATE */

	updateStatsOfUserAfterGame(userId: number) : Observable<void> { // update with relevant data
		const endpoint: string = `${this.apiUrl}/${userId}`; // modify that
		const body = {
			action: 'updateStats',
			userId: userId
		};

		return this.http.put<void>(endpoint, body);
	}
}
