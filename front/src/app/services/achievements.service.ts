import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Achievement } from "../models/achievement.model";

@Injectable({
	providedIn: 'root'
})
export class AchievementsService {

	constructor (private http: HttpClient) {};

	private apiBaseURL: string = 'http://localhost:3000';

	getAchievementById(id: number) : Observable<Achievement> {
		return this.http.get<Achievement>(`${this.apiBaseURL}/${id}`);
	}

	getAllAchievements() : Observable<Achievement[]> {
		return this.http.get<Achievement[]>(`${this.apiBaseURL}`);
	}

	getUserAchievements(userId: number) : Observable<Achievement[]> {

		const achievementsOfUsers$ : Observable<Achievement[]> = 
		this.http.get<Achievement[]>(`${this.apiBaseURL}/users_achievements?userId=${userId}`);

		const getAllAchievements$: Observable<Achievement[]> =
		this.http.get<Achievement[]>(``);
	}
}
