import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Gamecard } from "../models/game-card.model";

@Injectable({
	providedIn: 'root'
})
export class GamecardService {

	constructor (private http: HttpClient) {};

	private apiURL : string = 'http://localhost:3000/'; // modify this

	getGameCardById(id: number) : Observable<Gamecard> {
		return this.http.get<Gamecard>(`${this.apiURL}/${id}`);
	}
	
	getAllGameCards() : Observable<Gamecard[]> {
		return this.http.get<Gamecard[]>(`${this.apiURL}`);
	}
}
