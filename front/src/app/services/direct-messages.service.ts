import { Injectable } from "@angular/core";
import { DirectMessage } from "../models/direct-message.model";

@Injectable({
	providedIn: 'root'
})
export class DirectMessagesSevice {

	// hardcoded for demo purpose
	directMessages: DirectMessage[] = [
		{
			id: 1,
			otherPlayerId: 2,
			otherPlayerPseudo: 'opiron',
			otherPlayerStatus: 'online'
		},
		{
			id: 2,
			otherPlayerId: 1,
			otherPlayerPseudo: 'cjulienn',
			otherPlayerStatus: 'online'
		},
		{
			id: 3,
			otherPlayerId: 2,
			otherPlayerPseudo: 'mbennafl',
			otherPlayerStatus: 'offline'
		}
	]  
}
