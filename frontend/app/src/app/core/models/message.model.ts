export class Message {
	constructor(
		public content: string,
		public timestamp: Date = new Date(),
		public chatroomUserUid: number
	) {}
}
