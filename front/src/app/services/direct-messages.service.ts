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
			playerPseudo: 'opiron',
			playerStatus: 'online'
		},
		{
			id: 2,
			playerPseudo: 'cjulienn',
			playerStatus: 'online'
		},
		{
			id: 3,
			playerPseudo: 'mbennafl',
			playerStatus: 'offline'
		}
	]  
}
