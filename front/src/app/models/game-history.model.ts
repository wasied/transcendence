export class GameHistory {
	constructor (public id: number,
				 public userId: number,
				 public opponentId: number,
				 public opponentPseudo: string,
				 public opponentStatus: string,
				 public yourScore: number,
				 public opponentScore: number,
				 public ladderLevel: number) {}
}
