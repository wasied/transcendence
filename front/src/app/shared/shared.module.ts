import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxComponent } from './components/utils/checkbox/checkbox.component';
import { CustomButtonComponent } from './components/utils/custom-button/custom-button.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { ModalFormComponent } from './components/utils/modal-form/modal-form.component';
import { SeparatorLineComponent } from './components/utils/separator-line/separator-line.component';

import { AchievementComponent } from './components/subcomps/achievement/achievement.component';
import { AchievementsComponent } from './components/subcomps/achievements/achievements.component';
import { FriendComponent } from './components/subcomps/friend/friend.component';
import { FriendsComponent } from './components/subcomps/friends/friends.component';
import { StatsComponent } from './components/subcomps/stats/stats.component';
import { GameCardComponent } from './components/subcomps/game-card/game-card.component';
import { GameCardsComponent } from './components/subcomps/game-cards/game-cards.component';

@NgModule({
	declarations: [
		CheckboxComponent,
		CustomButtonComponent,
		HeaderComponent,
		ModalFormComponent,
    	SeparatorLineComponent,
    	StatsComponent,
    	AchievementComponent,
    	AchievementsComponent,
    	FriendComponent,
    	FriendsComponent,
		GameCardComponent,
		GameCardsComponent
	],
	imports: [
    	CommonModule
	],
	exports: [
		CheckboxComponent,
		CustomButtonComponent,
		HeaderComponent,
		ModalFormComponent,
		SeparatorLineComponent,
		StatsComponent,
		AchievementComponent,
		AchievementsComponent,
		FriendComponent,
		FriendsComponent,
		GameCardComponent,
		GameCardsComponent
	]
})
export class SharedModule { }
