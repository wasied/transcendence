import { Injectable } from "@angular/core";
import { GameHistory } from "../models/game-history.model";

@Injectable({
	providedIn: 'root'
})
export class GameHistoryService {

	// hardcoded for demo purpose
	gameHistory: GameHistory[] = [
		{
			opponentPseudo: 'cjulienn',
			opponentStatus: 'online',
			yourScore: 12,
			opponentScore: 11,
			ladderLevel: 1
		},
		{
			opponentPseudo: 'opiron',
			opponentStatus: 'offline',
			yourScore: 8,
			opponentScore: 12,
			ladderLevel: 2
		},
		{
			opponentPseudo: 'mphearph',
			opponentStatus: 'online',
			yourScore: 12,
			opponentScore: 7,
			ladderLevel: 3
		}
	]
}
