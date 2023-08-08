import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game-files/game/game.component';
import { GameViewComponent } from './game-files/game-view/game-view.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  	declarations: [
    	GameComponent,
     	GameViewComponent
  	],
  	imports: [
		CommonModule,
		SharedModule,
		GameRoutingModule
  	]
})
export class GameModule { }
