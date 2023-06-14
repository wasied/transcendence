import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderLpComponent } from './components/header-lp/header-lp.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ChatroomsComponent } from './components/chatrooms/chatrooms.component';
import { AppRoutingModule } from './app-routing.module';
import { AchievementComponent } from './components/achievement/achievement.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameCardsComponent } from './components/game-cards/game-cards.component';
import { FriendComponent } from './components/friend/friend.component';
import { FriendsComponent } from './components/friends/friends.component';
import { DirectMessageComponent } from './components/direct-message/direct-message.component';
import { DirectMessagesComponent } from './components/direct-messages/direct-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderLpComponent,
    LandingPageComponent,
    MainMenuComponent,
    ChatroomsComponent,
    AchievementComponent,
    AchievementsComponent,
    ChatroomComponent,
    GameCardComponent,
    GameCardsComponent,
    FriendComponent,
    FriendsComponent,
    DirectMessageComponent,
    DirectMessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
