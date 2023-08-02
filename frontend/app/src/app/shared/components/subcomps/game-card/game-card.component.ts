import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Gamecard } from 'src/app/core/models/game-card.model'; 

@Component({
	selector: 'app-game-card',
	templateUrl: './game-card.component.html',
	styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {

	@Input () gameCard!: Gamecard;

	constructor (private router: Router) {};

	goToProfile(userId: number) : void {
		this.router.navigate([]); // update that
	}
}
