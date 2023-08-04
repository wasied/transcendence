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
		this.router.navigate(['main', 'profile', userId]); // update that case if player is current user
	}

	goToSeeGameAsSpectator(gamecard: Gamecard) : void { // redirect to the game session as spectator, should use WS
		console.log('spectator mode : not yet implemented !');
	}
}
