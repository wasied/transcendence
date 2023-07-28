import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Achievement } from "../models/achievement.model";

@Injectable({
	providedIn: 'root'
})
export class AchievementsService {

	constructor (private http: HttpClient) {};

	private apiURL: string = 'http://localhost:3000/achievements_lists';

	getAchievementById(id: number) : Observable<Achievement> {
		return this.http.get<Achievement>(`${this.apiURL}/${id}`);
	}

	getAllAchievements() : Observable<Achievement[]> {
		return this.http.get<Achievement[]>(`${this.apiURL}`);
	}
}
