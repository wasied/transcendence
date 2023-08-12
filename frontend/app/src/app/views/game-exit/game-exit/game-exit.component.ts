import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameDataService, GameData } from 'src/app/core/services/game-data.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-game-exit',
	templateUrl: './game-exit.component.html',
	styleUrls: ['./game-exit.component.css']
})
export class GameExitComponent implements OnInit, OnDestroy {

	gameData: GameData | null = null;
	private subscriptionPlayers: Subscription | undefined;

	
	constructor (private gameDataService: GameDataService,
				 private router: Router,
				 private usersService: UsersService) {};

	ngOnInit(): void {
		this.retrieveGameData();
	}

	private retrieveGameData() : void {
		this.subscriptionPlayers = this.gameDataService.getGameData().subscribe(
			data => { this.gameData = data; },
			httpErrorHandler
		);
	}

	goToMainMenu() : void {
		this.router.navigate(['main']);
	}

	ngOnDestroy(): void {
		if (this.subscriptionPlayers) {
			this.subscriptionPlayers.unsubscribe();
		}
	}
}
