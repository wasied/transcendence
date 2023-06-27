import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { HeaderLpComponent } from './components/utils/header-lp/header-lp.component';
import { LandingPageComponent } from './components/views/landing-page/landing-page.component';
import { MainMenuComponent } from './components/views/main-menu/main-menu.component';
import { ChatroomsComponent } from './components/subcomps/chatrooms/chatrooms.component';
import { AppRoutingModule } from './app-routing.module';
import { AchievementComponent } from './components/subcomps/achievement/achievement.component';
import { AchievementsComponent } from './components/subcomps/achievements/achievements.component';
import { ChatroomComponent } from './components/subcomps/chatroom/chatroom.component';
import { GameCardComponent } from './components/subcomps/game-card/game-card.component';
import { GameCardsComponent } from './components/subcomps/game-cards/game-cards.component';
import { FriendComponent } from './components/subcomps/friend/friend.component';
import { FriendsComponent } from './components/subcomps/friends/friends.component';
import { DirectMessageComponent } from './components/subcomps/direct-message/direct-message.component';
import { DirectMessagesComponent } from './components/subcomps/direct-messages/direct-messages.component';
import { ProfileSelfComponent } from './components/views/profile-self/profile-self.component';
import { FriendsViewComponent } from './components/views/friends-view/friends-view.component';
import { GameHistoryViewComponent } from './components/views/game-history-view/game-history-view.component';
import { ChatroomsViewComponent } from './components/views/chatrooms-view/chatrooms-view.component';
import { DirectMessagesViewComponent } from './components/views/direct-messages-view/direct-messages-view.component';
import { GamesViewComponent } from './components/views/games-view/games-view.component';
import { ProfileOtherComponent } from './components/views/profile-other/profile-other.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/utils/sign-up/sign-up.component';
import { SignInComponent } from './components/utils/sign-in/sign-in.component';
import { InfoSecurityComponent } from './components/subcomps/info-security/info-security.component';

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
    ProfileSelfComponent,
    FriendsViewComponent,
    GameHistoryViewComponent,
    ChatroomsViewComponent,
    DirectMessagesViewComponent,
    GamesViewComponent,
    ProfileOtherComponent,
    SignUpComponent,
    SignInComponent,
    InfoSecurityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
