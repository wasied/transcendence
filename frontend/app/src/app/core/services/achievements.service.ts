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
	
	private apiBaseURL: string = `${environment.appUrl}:${environment.backendAPIPort}/achievements_lists`; // modify that

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
