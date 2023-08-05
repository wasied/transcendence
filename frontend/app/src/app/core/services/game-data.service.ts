import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from 'rxjs';

export interface GameData {
	variant: 'standard' | 'mortSubite' | 'twoPoints' | 'chaos',
	leftPlayerId: number | null,
	rightPlayerId: number | null,
	scoreLeftPlayer: number,
	scoreRightPlayer: number,
	durationInSec: number,
	isActive: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class GameDataService {

	private gameData = new BehaviorSubject<GameData | null>(null);

	updateGameData(newGameData: GameData) : void {
		this.gameData.next(newGameData);
	}

	updateIsActive(isActive: boolean) : void {
		const currentGameData = this.gameData.getValue();

		if (!currentGameData) {
			return;
		}

		const updatedGameData = { ...currentGameData, isActive: isActive };

		this.updateGameData(updatedGameData)
	}

	getGameData() : Observable<GameData | null> {
		return this.gameData.asObservable();
	}
}
