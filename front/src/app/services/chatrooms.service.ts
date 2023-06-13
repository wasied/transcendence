import { Injectable } from "@angular/core";
import { Chatroom } from "../models/chatroom.model";

@Injectable({
	providedIn: 'root'
})
export class ChatroomsService {

	// harcoded for demo purpose
	chatrooms: Chatroom[] = [
		{
			id: 1,
			chatroomName: 'Casual Gaming',
			owner: 'cjulienn',
			accessStatus: 'password protected',
			participants: ['opiron', 'cjulienn']
		},
		{
			id: 2,
			chatroomName: '42',
			owner: 'opiron',
			accessStatus: 'private',
			participants: ['player1', 'player2', 'player3']
		},
		{
			id: 3,
			chatroomName: '19 gamers',
			owner: 'archimede',
			accessStatus: 'open access',
			participants: ['player1', 'player2', 'player3', 'player4']
		}
	]
}
