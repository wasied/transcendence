import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Achievement } from "../models/achievement.model";

@Injectable({
	providedIn: 'root'
})
export class AchievementsService {

	constructor (private http: HttpClient) {};

	private apiURL: string = '';

	getAchievementById(id: number) : Observable<Achievement> {
		return this.http.get<Achievement>(`${this.apiURL}/${id}`);
	}

	getAllAchievements() : Observable<Achievement[]> {
		return this.http.get<Achievement[]>(`${this.apiURL}`);
	}
}
