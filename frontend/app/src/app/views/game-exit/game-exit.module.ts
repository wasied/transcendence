import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { GameExitRoutingModule } from './game-exit-routing.module';
import { GameExitComponent } from './game-exit/game-exit.component';

@NgModule({
	declarations: [
		GameExitComponent
	],
	imports: [
		CommonModule,
    	SharedModule,
		GameExitRoutingModule
  	]
})
export class GameExitModule { }
