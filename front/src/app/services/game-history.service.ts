import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GameHistory } from "../models/game-history.model";

@Injectable({
	providedIn: 'root'
})
export class GameHistoryService {

	constructor (private http: HttpClient) {};

	private apiUrl : string = 'http://localhost:3000/' // change this

	getGameHistoryById(id: number) : Observable<GameHistory> {
		return this.http.get<GameHistory>(`${this.apiUrl}/${id}`);
	}
	
	getAllGameHistories() : Observable<GameHistory[]> {
		return this.http.get<GameHistory[]>(`${this.apiUrl}`);
	}
}
