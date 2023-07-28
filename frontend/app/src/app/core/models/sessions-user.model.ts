export class SessionsUser {
	constructor (public id: number,
				 public user_id: number,
				 public session_id: number,
				 public spectator: boolean,
				 public alive: boolean,
				 public score: number,
				 public createdAt: Date) {}
}
