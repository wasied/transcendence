import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { GameParamsComponent } from './game-params/game-params.component';
import { GameParamsRoutingModule } from './game-params-routing.module';

@NgModule({
	declarations: [
		GameParamsComponent
	],
	imports: [
		CommonModule,
    	SharedModule,
		GameParamsRoutingModule
  	]
})
export class GameParamsModule { }
