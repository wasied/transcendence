export class Message {
	constructor(
		public text: string,
		public timestamp: Date = new Date(),
		public sender: string,
		public photoUrl: string = './src/assets/dummy_profile.jpg'
	) {}
}
