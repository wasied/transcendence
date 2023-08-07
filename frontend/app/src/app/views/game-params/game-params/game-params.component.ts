import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameDataService, GameData } from 'src/app/core/services/game-data.service';
import { Subscription } from 'rxjs';
import { AccessControlService } from 'src/app/core/services/access-control.service';

@Component({
	selector: 'app-game-params',
	templateUrl: './game-params.component.html',
	styleUrls: ['./game-params.component.css']
})
export class GameParamsComponent implements OnDestroy {
	
	gameMode!: 'standard' | 'mortSubite' | 'twoPoints' | 'chaos';
	selectedMode: number | null = null;
	isStandardGame: boolean = true;
	private subscription: Subscription | undefined;

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

  	constructor(private router: Router, private gameDataService: GameDataService, private accessControlService: AccessControlService ) {}

	/* CHECKBOX MANAGEMENT */
	
	onLiClick(index: number) {} // is that useful ?

	onApplyMode(index: number) {
		if (index === this.selectedMode) {
			this.selectedMode = null;
		} else {
			this.selectedMode = index;
		}
	}

	/* GAME DATA MANAGEMENT */

	private setGameMode() : void {
		switch (this.selectedMode) {
			case (0): 
			this.gameMode = 'chaos';
			break;
			case (1):
			this.gameMode = 'mortSubite';
			break;
			case (2):
			this.gameMode = 'twoPoints';
			break;
			case (3):
			this.gameMode = 'standard';
			break;
			default:
			console.log('invalid game mode selected');
			break;
		}
	}
	
	private initGameData() : void {
		if (this.selectedMode === null) {
			this.selectedMode = 3;
		}

		this.setGameMode();

		const gameData: GameData = {
			variant: this.gameMode,
			leftPlayerId: null,
			rightPlayerId: null,
			scoreLeftPlayer: 0,
			scoreRightPlayer: 0,
			durationInSec: 0,
			isActive: false
		}
		this.gameDataService.updateGameData(gameData);
	}

	/* GUARD */

	/*grantAccess(): void {
		this.accessControlService.setAccess(true);
	}*/

	/* LINKS */

	onClickStart() : void {
		this.initGameData();
		this.accessControlService.setAccess(true);
		this.router.navigate(['main/game_lobby']);
	}

	onClickSpectator() : void {
		this.router.navigate(['main/games']);
	}

	/* AVOID MEMORY LEAKS */

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
