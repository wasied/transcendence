import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CheckboxComponent } from './components/utils/checkbox/checkbox.component';
import { CustomButtonComponent } from './components/utils/custom-button/custom-button.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { ModalComponent } from './components/utils/modal/modal.component';

import { AchievementComponent } from './components/subcomps/achievement/achievement.component';
import { AchievementsComponent } from './components/subcomps/achievements/achievements.component';
import { FriendComponent } from './components/subcomps/friend/friend.component';
import { FriendsComponent } from './components/subcomps/friends/friends.component';
import { StatsComponent } from './components/subcomps/stats/stats.component';
import { GameCardComponent } from './components/subcomps/game-card/game-card.component';
import { GameCardsComponent } from './components/subcomps/game-cards/game-cards.component';
import { MessageComponent } from './components/subcomps/message/message.component';
import { ChatComponent } from './components/subcomps/chat/chat.component';

import { DisplayMsgTimestampPipe } from './display-msg-timestamp.pipe';

@NgModule({
	declarations: [
		CheckboxComponent,
		CustomButtonComponent,
		HeaderComponent,
    	StatsComponent,
    	AchievementComponent,
    	AchievementsComponent,
    	FriendComponent,
    	FriendsComponent,
		GameCardComponent,
		GameCardsComponent,
		MessageComponent,
		ChatComponent,
		DisplayMsgTimestampPipe,
  		ModalComponent,
	],
	imports: [
    	CommonModule,
		ReactiveFormsModule,
		FormsModule
	],
	exports: [
		CheckboxComponent,
		CustomButtonComponent,
		HeaderComponent,
		StatsComponent,
		AchievementComponent,
		AchievementsComponent,
		FriendComponent,
		FriendsComponent,
		GameCardComponent,
		GameCardsComponent,
		MessageComponent,
		ChatComponent,
		DisplayMsgTimestampPipe,
		ModalComponent,
	]
})
export class SharedModule { }
