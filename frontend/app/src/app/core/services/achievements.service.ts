import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Achievement } from "src/app/core/models/achievement.model";

@Injectable({
	providedIn: 'root'
})
export class AchievementsService {

	constructor (private http: HttpClient) {};

	hardcodedAchievements: Achievement[] = [{
		id: 1,
		userId: 1,
		date: new Date(),
		achievementName: 'test',
		description: 'description test'
	}];

	getHarcodedAchievements() : Observable<Achievement[]> { // for testing only
		return of(this.hardcodedAchievements);
	}

	// with DB
	
	private apiBaseURL: string = 'http://localhost:3000/achievements_lists'; // modify that

	// get all chivements
	getAllAchievements() : Observable<Achievement[]> {
		return this.http.get<Achievement[]>(`${this.apiBaseURL}`);
	}

	// get an achievement based on it's id
	getAchievementById(id: number) : Observable<Achievement> {
		return this.http.get<Achievement>(`${this.apiBaseURL}/${id}`);
	}

	// get all achievements of a given user based on user's id
	getUserAchievements(userId: number) : Observable<Achievement[]> {
		return this.http.get<Achievement[]>(`${this.apiBaseURL}`);
	}
}
