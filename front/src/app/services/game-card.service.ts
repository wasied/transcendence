import { Injectable } from "@angular/core";
import { Gamecard } from "../models/game-card.model";

@Injectable({
	providedIn: 'root'
})
export class GamecardService {
	
	// hardcoded for demo purpose
	gamecard: Gamecard[] = [
		{
			playerOne: 'opiron',
			playerTwo: 'cjulienn'
		},
		{
			playerOne: 'archimede',
			playerTwo: 'mpeharhp'
		},
		{
			playerOne: 'zeus',
			playerTwo: 'horus'
		}
	]
}
