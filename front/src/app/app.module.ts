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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
