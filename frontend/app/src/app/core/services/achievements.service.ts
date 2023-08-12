import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Achievement } from "src/app/core/models/achievement.model";
import { environment } from "src/environments/environment";

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
		description: 'description test0'
	},
	{
		id: 2,
		userId: 1,
		date: new Date(),
		achievementName: 'test',
		description: 'description test1'
	},];

	getHarcodedAchievements() : Observable<Achievement[]> { // for testing only
		return of(this.hardcodedAchievements);
	}

	// with DB
	
	private apiBaseURL: string = `${environment.appUrl}:${environment.backendAPIPort}/achievements_lists`;

	// get all chivements
	getAllAchievements() : Observable<Achievement[]> {
		const endpoint: string = `${this.apiBaseURL}`; // to modify
		
		return this.http.get<Achievement[]>(endpoint);
	}

	// get an achievement based on it's id
	getAchievementById(id: number) : Observable<Achievement> {
		const endpoint: string = `${this.apiBaseURL}/${id}`; // to modify
		
		return this.http.get<Achievement>(endpoint);
	}

	// get all achievements of a given user based on user's id
	getUserAchievements(userId: number) : Observable<Achievement[]> {
		const endpoint: string = `${this.apiBaseURL}`; // to modify
		
		return this.http.get<Achievement[]>(endpoint);
	}
}
