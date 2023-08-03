import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProfileSelfComponent } from './components/profile-self/profile-self.component';
import { ProfileOtherComponent } from './components/profile-other/profile-other.component';
import { InfoSecurityComponent } from './components/info-security/info-security.component';
import { ProfileBadgeComponent } from './components/profile-badge/profile-badge.component';
import { MatchHistoryViewComponent } from './components/match-history-view/match-history-view.component';
import { MatchHistoryComponent } from './components/match-history/match-history.component';
import { MatchHistoryElemComponent } from './components/match-history-elem/match-history-elem.component';

import { ProfileRoutingModule } from './profile-router.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ProfileSelfComponent,
		ProfileOtherComponent,
		InfoSecurityComponent,
		ProfileBadgeComponent,
		MatchHistoryViewComponent,
		MatchHistoryComponent,
		MatchHistoryElemComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ProfileRoutingModule,
		ReactiveFormsModule
	]
})
export class ProfileModule { }
