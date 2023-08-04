import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameDataService, GameData } from 'src/app/core/services/game-data.service';

@Component({
	selector: 'app-game-params',
	templateUrl: './game-params.component.html',
	styleUrls: ['./game-params.component.css']
})
export class GameParamsComponent {
	selectedMode: number | null = null;

	gameModes = [
		{
			name: 'Chaos Mode',
			description: 'Very fun mode that add randomness when the ball collides with the borders or the paddles.',
			iconClass: 'fa-solid fa-shuffle'
		},
		{
			name: 'Mort Subite',
			description: 'The first player that score wins, as simple as that.',
			iconClass: 'fa-solid fa-skull'
		},
		{
			name: 'Two Points Appart Mode',
			description: 'Reach the score of twelve + Have a two-point difference with your opponent.',
			iconClass: 'fa-solid fa-star'
		}
  	];

  	constructor(private router: Router) {}

	onClickStart() {
		if (this.selectedMode === null) {
		alert("Choisis un mode de jeu !");
		} else {
		this.router.navigate(['main/game_lobby']);
		}
	}

	onClickSpectator() {
		this.router.navigate(['main/games']);
	}

	onLiClick(index: number) {
		this.selectedMode = index;
	}
	
	onApplyMode(index: number) {
		this.selectedMode = index;
	}
}
