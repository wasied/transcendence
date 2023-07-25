import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Achievement } from "../models/achievement.model";

@Injectable({
	providedIn: 'root'
})
export class AchievementsService {

	constructor (private http: HttpClient) {};

	private apiBaseURL: string = 'http://localhost:3000/achievements_lists'; // modify that

	getAchievementById(id: number) : Observable<Achievement> {
		return this.http.get<Achievement>(`${this.apiBaseURL}/${id}`);
	}

	getAllAchievements() : Observable<Achievement[]> {
		return this.http.get<Achievement[]>(`${this.apiBaseURL}`);
	}

	// to change : should display the achievements unlocked by a given user identified by it's id
	// to be used in profiles (profile-self and profile-other)
	getUserAchievements(userId: number) : Observable<Achievement[]> {
		return this.http.get<Achievement[]>(`${this.apiBaseURL}`);
	}
}
