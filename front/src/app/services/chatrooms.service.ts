import { Injectable } from "@angular/core";
import { Chatroom } from "../models/chatroom.model";

@Injectable({
	providedIn: 'root'
})
export class ChatroomsService {

	// hardcoded for demo purpose
	chatrooms: Chatroom[] = [
		{
			id: 1,
			chatroomName: 'Casual Gaming',
			ownerId: 1,
			owner: 'cjulienn',
			accessStatus: 'password protected',
			participants: ['opiron', 'cjulienn'],
			participantsId: [1, 2]
		},
		{
			id: 2,
			chatroomName: '42',
			ownerId: 2,
			owner: 'opiron',
			accessStatus: 'private',
			participants: ['player1', 'player2', 'player3'],
			participantsId: [2, 3]
		},
		{
			id: 3,
			chatroomName: '19 gamers',
			ownerId: 3,
			owner: 'archimede',
			accessStatus: 'open access',
			participants: ['player1', 'player2', 'player3', 'player4'],
			participantsId: [3, 1]
		}
	]
}
