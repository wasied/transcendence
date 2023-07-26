import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxComponent } from './components/utils/checkbox/checkbox.component';
import { CustomButtonComponent } from './components/utils/custom-button/custom-button.component';
import { HeaderComponent } from './components/utils/header/header.component';
import { HeaderLpComponent } from '../views/landing-page/components/header-lp/header-lp.component';
import { ModalFormComponent } from './components/utils/modal-form/modal-form.component';
import { SeparatorLineComponent } from './components/utils/separator-line/separator-line.component';
import { SignInComponent } from './components/utils/sign-in/sign-in.component';
import { SignUpComponent } from './components/utils/sign-up/sign-up.component';

import { AchievementComponent } from './components/subcomps/achievement/achievement.component';
import { AchievementsComponent } from './components/subcomps/achievements/achievements.component';
import { FriendComponent } from './components/subcomps/friend/friend.component';
import { FriendsComponent } from './components/subcomps/friends/friends.component';
import { StatsComponent } from './components/subcomps/stats/stats.component';

@NgModule({
  declarations: [
    CheckboxComponent,
    CustomButtonComponent,
    HeaderComponent,
    HeaderLpComponent,
    ModalFormComponent,
    SeparatorLineComponent,
    SignInComponent,
    SignUpComponent,
    StatsComponent,
    AchievementComponent,
    AchievementsComponent,
    FriendComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
