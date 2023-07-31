import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'app-game-lobby',
	templateUrl: './game-lobby.component.html',
	styleUrls: ['./game-lobby.component.css']
})
export class GameLobbyComponent implements OnInit, OnDestroy {

	isMatched: boolean = false;
	loadingMessage: string = 'Please stand by';
	dotCount: number = 0;
  	timeoutId!: any;

	ngOnInit(): void {
		this.updateLoadingMessage();
		setTimeout(() => { // change this
			this.isMatched = true;
			clearTimeout(this.timeoutId);
		}, 3000);
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
