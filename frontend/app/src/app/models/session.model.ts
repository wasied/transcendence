export class Session {
	constructor (public id: number,
				 public autoMatching: boolean,
				 public customization: boolean,
				 public ended: boolean,
				 public winner_id: number,
				 public createdAt: Date,
				 public updatedAt: Date) {}
}
