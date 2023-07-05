import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Gamecard } from "../models/game-card.model";
import { GameHistory } from "../models/game-history.model";

@Injectable({
	providedIn: 'root'
})
export class GameHistoryService {

	constructor (private http: HttpClient) {};

	private baseURL : string = 'http://localhost:3000/';

	

	
}
