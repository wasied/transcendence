import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameDataService } from 'src/app/core/services/game-data.service';

@Component({
	selector: 'app-game-lobby',
	templateUrl: './game-lobby.component.html',
	styleUrls: ['./game-lobby.component.css']
})
export class GameLobbyComponent implements OnInit, OnDestroy {

	isMatched: boolean = false;
	loadingMessage: string = 'Please stand by';
	dotCount: number = 0;
  	timeoutId!: any; // not good

	constructor (private gameDataService: GameDataService) {}

	ngOnInit(): void {
		this.uploadGameDataStatus();
		/* TIMEOUT TO DISPLAY STANDBY MSG */
		this.updateLoadingMessage();
		setTimeout(() => { // change this
			this.isMatched = true;
			clearTimeout(this.timeoutId);
		}, 3000);
	}

	private uploadGameDataStatus() : void {
		this.gameDataService.updateIsActive(true);
	}

	updateLoadingMessage() : void {
		if (!this.isMatched) {
			this.dotCount = (this.dotCount % 3) + 1;
			this.loadingMessage = 'Please stand by' + '.'.repeat(this.dotCount);
			this.timeoutId = setTimeout(() => this.updateLoadingMessage(), 500);
		}
	}

	triggerGameSession() : void {
		console.log('implement this : link to game session');
	}

	ngOnDestroy(): void {
		clearTimeout(this.timeoutId);
	}
}
