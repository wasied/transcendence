import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameDataService } from 'src/app/core/services/game-data.service';
import { Router } from '@angular/router';
import { SessionsService } from '../../../core/services/sessions.service';
import { UsersService } from '../../../core/services/users.service';
import { User } from 'src/app/core/models/user.model';
import { Observable, tap } from 'rxjs';

@Component({
	selector: 'app-game-lobby',
	templateUrl: './game-lobby.component.html',
	styleUrls: ['./game-lobby.component.css']
})
export class GameLobbyComponent implements OnInit, OnDestroy {

	isMatched: boolean = false;
	loadingMessage: string = 'Please stand by';
	dotCount: number = 0;
  	timeoutStandById!: any;
	timeoutBootGameId!: any;
	players$!: Observable<User[]>;
	player1!: User;
	player2!: User;

	constructor (private gameDataService: GameDataService,
				 private sessionsService: SessionsService,
				 private usersService: UsersService,
				 private router: Router) {}

	ngOnInit(): void {
		/* init observables */
		this.players$ = this.usersService.getPlayersAfterMatchmaking().pipe(
			tap(players => {
				this.player1 = players[0];
				this.player2 = players[1];
			})
		);
		/* init matchmaking process */
			this.triggerMatchmakingProcess();
		/* timeout to display standby message */
		this.updateLoadingMessage();
	}

	/* MATCHMAKING */

	triggerMatchmakingProcess() : void {
		// include the logic there
	}

	afterMatchmakingComplete() : void {

		// this.triggerGameSession();
	}

	/* REROUTE TO GAME SESSION */

	triggerGameSession(gameId: number) : void {
		this.router.navigate(['main', 'game', gameId]); // change this
	}

	private updateGameDataWithPlayers() : void {
		this.gameDataService.updateWithPlayers(this.player1, this.player2);
	}

	ngOnDestroy(): void {
		/* clear timeouts */
		clearTimeout(this.timeoutStandById);
		clearTimeout(this.timeoutBootGameId);
		/* update the gameData with players to further reuse in game exit component */
		this.updateGameDataWithPlayers();
	}

	/* DISPLAY STANDBY MESSAGE */
	updateLoadingMessage() : void {
		if (!this.isMatched) {
			this.loadingMessage = 'Please stand by' + '.'.repeat(this.dotCount);
			this.dotCount = (this.dotCount + 1) % 4;
			this.timeoutStandById = setTimeout(() => this.updateLoadingMessage(), 500);
		}
	}
}
