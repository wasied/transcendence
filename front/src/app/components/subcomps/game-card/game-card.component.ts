import { Component, Input } from '@angular/core';
import { Gamecard } from 'src/app/models/game-card.model';

@Component({
	selector: 'app-game-card',
	templateUrl: './game-card.component.html',
	styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {
	
	@Input () gameCard!: Gamecard;
}
