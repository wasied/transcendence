import { Injectable } from "@angular/core";
import { Stats } from "../models/stats.model";

@Injectable({
	providedIn: 'root'
})
export class StatsService {

	// hardcoded for demo purpose
	stats: Stats = {
		id: 1,
		victories: 9,
		defeats: 4,
		gamesPlayed: 13,
		ratio: 2,
		totalTimePlaying: new Date()
	}
}
