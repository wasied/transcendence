import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

export interface GameData {
	variant: 'standard' | 'mortSubite' | 'twoPoints' | 'chaos',
	leftPlayerId: number,
	rightPlayerId: number,
	scoreLeftPlayer: number,
	scoreRightPlayer: number,
	durationInSec: number
}

@Injectable({
	providedIn: 'root'
})
export class GameDataService {

	private gameData = new BehaviorSubject<GameData | null>(null);

	updateGameData(newGameData: GameData) : void {
		this.gameData.next(newGameData);
	}

	getGameData() : Observable<GameData | null> {
		return this.gameData.asObservable();
	}
}
