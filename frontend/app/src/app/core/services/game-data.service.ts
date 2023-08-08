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
	gameStart!: Date;

	/* TIME CALCULATION */

	startGame() {
		this.gameStart = new Date();
	}

	endGame(): number {
		let gameEnd: Date = new Date();
	
		// Calculate the difference in milliseconds and convert to seconds
		let gameDuration: number = (gameEnd.getTime() - this.gameStart.getTime()) / 1000;
	
		return gameDuration;
	}
	
	/* DATA MANAGEMENT */
	
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
