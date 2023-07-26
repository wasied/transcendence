import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatchHistoryViewComponent } from './match-history-view/match-history-view.component';

@NgModule({
	declarations: [
		MatchHistoryViewComponent
	],
	imports: [
		CommonModule,
		SharedModule
	]
})
export class MatchHistoryViewModule { }
