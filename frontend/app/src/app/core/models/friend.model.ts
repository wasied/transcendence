export class Friend {
	constructor (public id: number,
				 public userId: number,
				 public friendId: number,
				 public friendName: string,
				 public friendStatus: string,
				 public createdAt: Date) {}
}
