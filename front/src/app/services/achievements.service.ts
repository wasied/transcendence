import { Injectable } from "@angular/core";
import { Achievement } from "../models/achievement.model";

@Injectable({
	providedIn: 'root'
})
export class AchievementsService {

	// hardcoded for demo purpose
	achievements: Achievement[] = [
		{
			date: new Date(),
			achievementName: 'First Win !',
			description: 'You won your first pong match'
		},
		{
			date: new Date(),
			achievementName: 'Great Ratio',
			description: 'Your ratio of win/losses is equal or superior to 2'
		},
		{
			date: new Date(),
			achievementName: 'Spectator',
			description: 'You saw an entire Pong match as a spectator'
		}
	]
}
