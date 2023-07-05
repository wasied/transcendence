export class Stat {
	constructor(public id: number,
				public userId: number,
				public victories: number,
				public defeats: number,
				public gamesPlayed: number,
				public ratio: number,
				public totalTimePlaying: Date) {}
}
