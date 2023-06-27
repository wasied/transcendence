import { Injectable } from "@angular/core";
import { GameHistory } from "../models/game-history.model";

@Injectable({
	providedIn: 'root'
})
export class GameHistoryService {

	// hardcoded for demo purpose
	gameHistory: GameHistory[] = [
		{
			id: 1,
			userId: 1,
			opponentId: 3,
			opponentPseudo: 'cjulienn',
			opponentStatus: 'online',
			yourScore: 12,
			opponentScore: 11,
			ladderLevel: 1
		},
		{
			id: 2,
			userId: 2,
			opponentId: 1,
			opponentPseudo: 'opiron',
			opponentStatus: 'offline',
			yourScore: 8,
			opponentScore: 12,
			ladderLevel: 2
		},
		{
			id: 3,
			userId: 3,
			opponentId: 2,
			opponentPseudo: 'mphearph',
			opponentStatus: 'online',
			yourScore: 12,
			opponentScore: 7,
			ladderLevel: 3
		}
	]
}
