export class GameHistory {
	constructor (public opponentPseudo: string,
				 public opponentStatus: string,
				 public yourScore: number,
				 public opponentScore: number,
				 public ladderLevel: number) {}
}
