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

	// with DB
	
	private apiUrl : string = 'http://localhost:3000/stats';

	getAllStats() : Observable<Stat[]> {
		return this.http.get<Stat[]>(`${this.apiUrl}`);
	}

	getStatById(id: number) : Observable<Stat> {
		return this.http.get<Stat>(`${this.apiUrl}/${id}`);
	}

	getStatsFromUserById(userId: number) : Observable<Stat> {
		return this.http.get<Stat>(`${this.apiUrl}/${userId}`);
	}
}
