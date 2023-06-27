export class Chatroom {
	constructor (public id: number,
				 public chatroomName: string,
				 public ownerId: number,
				 public owner: string,
				 public accessStatus: string,
				 public participants: string[],
				 public participantsId: number[]) {}
}
