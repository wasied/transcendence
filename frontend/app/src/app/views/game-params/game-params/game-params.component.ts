import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-game-params',
	templateUrl: './game-params.component.html',
	styleUrls: ['./game-params.component.css']
})
export class GameParamsComponent {
	
	constructor (private router: Router) {};
	
	onApplyChaosPhysics(checked: boolean) : void {
		console.log('chaos physics : not implemented yet !');
	}

	onApplyMortSubite(checked: boolean) : void {
		console.log('Mort Subite : not implemented yet !');
	}

	onApplyTwoPoints(checkbox: boolean) : void {
		console.log('Two Points : not implemented yet !');
	}

	onClickStart() : void {
		this.router.navigate(['main/game_lobby']);
	}

	onClickSpectator() : void {
		console.log('triggered !');
		this.router.navigate(['main/games']);
	}
}
