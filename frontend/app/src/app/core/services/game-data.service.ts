import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from "../models/user.model";
import { AuthHttpClient } from 'src/app/auth-http-client';
import { environment } from 'src/environments/environment';

export interface GameData {
	variant: 'standard' | 'mortSubite' | 'twoPoints' | 'chaos',
	scoreLeftPlayer: number,
	scoreRightPlayer: number
}

@Injectable({
	providedIn: 'root'
})
export class GameDataService {

	private gameData = new BehaviorSubject<GameData | null>(null);

	private apiURL = `${environment.appUrl}:${environment.backendAPIPort}/`;

	constructor (private authHttp: AuthHttpClient) {};
	
	updateGameData(newGameData: GameData) : void {
		this.gameData.next(newGameData);
	}

	getGameData() : Observable<GameData | null> {
		return this.gameData.asObservable();
	}

	getPlayersAfterMatchmaking() : Observable<User[]> {
		const endpoint: string = `${this.apiURL}`; // modify this

		return this.authHttp.get<User[]>(endpoint);
	}
}
