import { Injectable } from "@angular/core";
import { Stat } from "../models/stat.model";

@Injectable ({
	providedIn: 'root'
})
export class StatsService {
	// hardcoded for demo purpose
	stats: Stat[] = [
		{
			id: 1,
			victories: 4,
			defeats: 5,
			gamesPlayed: 9,
			ratio: this.calcRatio(4, 5),
			totalTimePlaying: new Date()
		},
		{
			id: 2,
			victories: 4,
			defeats: 5,
			gamesPlayed: 9,
			ratio: this.calcRatio(4, 5),
			totalTimePlaying: new Date()
		}
	]

	calcRatio(win: number, lose: number) : number {
		return (win / lose);
	}
}
