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
			friendName: 'opiron',
			friendStatus: 'online'
		},
		{
			friendName: 'cjulienn',
			friendStatus: 'online'
		},
		{
			friendName: 'styx2147',
			friendStatus: 'offline'
		},
		{
			friendName: 'mbennafl',
			friendStatus: 'in a game'
		},
		{
			friendName: 'mpeharph',
			friendStatus: 'in a game'
		},
		{
			friendName: 'genghis_khan',
			friendStatus: 'online'
		}
	]
}
