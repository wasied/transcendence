export class DirectMessage {
	constructor (public id: number,
				 public otherPlayerId: number,
				 public otherPlayerPseudo: string,
				 public otherPlayerStatus: string) {}
}
