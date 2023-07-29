import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { GameLobbyRoutingModule } from './game-lobby-routing.module';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';

@NgModule({
	declarations: [
		GameLobbyComponent
	],
	imports: [
		CommonModule,
    	SharedModule,
		GameLobbyRoutingModule
  	]
})
export class GameLobbyModule { }
