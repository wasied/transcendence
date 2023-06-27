import { Injectable } from "@angular/core";
import { Friend } from "../models/friend.model";

@Injectable({
	providedIn: 'root'
})
export class FriendService
{
	// hardcoded for demo purpose
	friends: Friend[] = [
		{
			id: 1,
			userId: 1,
			friendId: 4,
			friendName: 'opiron',
			friendStatus: 'online',
			createdAt: new Date()
		},
		{
			id: 2,
			userId: 2,
			friendId: 3,
			friendName: 'cjulienn',
			friendStatus: 'online',
			createdAt: new Date()
		},
		{
			id:3,
			userId: 3,
			friendId: 5,
			friendName: 'styx2147',
			friendStatus: 'offline',
			createdAt: new Date()
		},
		{
			id: 4,
			userId: 4,
			friendId: 4,
			friendName: 'mbennafl',
			friendStatus: 'in a game',
			createdAt: new Date()
		},
		{
			id: 5,
			userId: 5,
			friendId: 1,
			friendName: 'mpeharph',
			friendStatus: 'in a game',
			createdAt: new Date()
		},
		{
			id: 6,
			userId: 6,
			friendId: 2,
			friendName: 'genghis_khan',
			friendStatus: 'online',
			createdAt: new Date()
		}
	]
}
