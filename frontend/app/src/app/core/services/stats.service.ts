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

	// to have all stats from every player
	getAllStats() : Observable<Stat[]> {
		return this.http.get<Stat[]>(`${this.apiUrl}`);
	}

	// to get the stats based on it's id
	getStatById(id: number) : Observable<Stat> {
		return this.http.get<Stat>(`${this.apiUrl}/${id}`);
	}

	// to get the stats pertaining to a given player, based on the player's id
	getStatsFromUserById(userId: number) : Observable<Stat> {
		return this.http.get<Stat>(`${this.apiUrl}/${userId}`);
	}
}
