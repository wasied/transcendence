export class GameHistory {
	constructor (public userId: number,
				 public opponentId: number,
				 public opponentPseudo: string,
				 public opponentStatus: string,
				 public yourScore: number,
				 public opponentScore: number) {}
}
