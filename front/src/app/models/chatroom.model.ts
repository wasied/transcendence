export class Chatroom {
	constructor (public id: number,
				 public chatroomName: string,
				 public owner: string,
				 public accessStatus: string,
				 public participants: string[]) {}
}
