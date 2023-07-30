export class Achievement {
	constructor (public id: number,
				 public userId: number,
				 public date: Date,
				 public achievementName: string,
				 public description: string) {}
}
