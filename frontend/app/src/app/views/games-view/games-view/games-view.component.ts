import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-games-view',
	templateUrl: './games-view.component.html',
	styleUrls: ['./games-view.component.css']
})
export class GamesViewComponent {

	constructor (private router: Router) {};
	
	onGoBackToGameMenu() : void {
		this.router.navigate(['main', 'game_params']);
	}
}
