import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProfileSelfComponent } from './components/profile-self/profile-self.component';
import { ProfileOtherComponent } from './components/profile-other/profile-other.component';
import { InfoSecurityComponent } from './components/info-security/info-security.component';

import { ProfileRoutingModule } from './profile-router.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ProfileSelfComponent,
		ProfileOtherComponent,
		InfoSecurityComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		ProfileRoutingModule,
		ReactiveFormsModule
	]
})
export class ProfileModule { }
