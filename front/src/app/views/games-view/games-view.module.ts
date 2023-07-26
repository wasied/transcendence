import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GamesViewComponent } from './games-view/games-view.component';

@NgModule({
	declarations: [
		GamesViewComponent
	],
	imports: [
		CommonModule,
    	SharedModule
  	]
})
export class GamesViewModule { }
