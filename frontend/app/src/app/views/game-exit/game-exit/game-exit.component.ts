import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameDataService, GameData } from 'src/app/core/services/game-data.service';
import { StatsService } from 'src/app/core/services/stats.service';
import { Subscription, Observable } from 'rxjs';
import { UsersService } from '../../../core/services/users.service';
import { User } from 'src/app/core/models/user.model';
import { Router } from '@angular/router';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-game-exit',
	templateUrl: './game-exit.component.html',
	styleUrls: ['./game-exit.component.css']
})
export class GameExitComponent implements OnInit, OnDestroy {

	players$!: Observable<User[]>;
	gameData: GameData | null = null;
	private subscription: Subscription | undefined;
	
	constructor (private gameDataService: GameDataService,
				 private statsService: StatsService,
				 private usersService: UsersService,
				 private router: Router) {};

	ngOnInit(): void {
		this.retrieveGameData();
		this.loadPlayers();
		this.updateStats();
	}

	private loadPlayers() : void {
		const idPlayer1 = this.gameData?.leftPlayerId;
		const idPlayer2 = this.gameData?.rightPlayerId;
		
		// this.players$ = this.usersService.getUsersAfterPlayingGame(idPlayer1, idPlayer2); // enable this
	}

	private updateStats() : void {
		// this.statsService.updateStatsOfUserAfterGame(); // create an enable this
	}

	private retrieveGameData() : void {
		this.subscription = this.gameDataService.getGameData().subscribe(
			data => { this.gameData = data; },
			httpErrorHandler
		);
		console.log(this.gameData?.variant); // debug
		console.log(this.gameData?.isActive); // debug
	}

	goToMainMenu() : void {
		this.router.navigate(['main']);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
