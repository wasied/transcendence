import { Injectable } from "@angular/core";
import { Gamecard } from "../models/game-card.model";

@Injectable({
	providedIn: 'root'
})
export class GamecardService {
	
	// hardcoded for demo purpose
	gamecard: Gamecard[] = [
		{
			id: 1,
			playerOneId: 1,
			playerTwoId: 3,
			playerOne: 'opiron',
			playerTwo: 'cjulienn'
		},
		{
			id:2,
			playerOneId: 2,
			playerTwoId: 1,
			playerOne: 'archimede',
			playerTwo: 'mpeharhp'
		},
		{
			id:3,
			playerOneId: 3,
			playerTwoId: 2,
			playerOne: 'zeus',
			playerTwo: 'horus'
		}
	]
}
