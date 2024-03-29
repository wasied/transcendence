import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FriendsViewComponent } from './components/friends-view/friends-view.component';
import { FriendsViewRoutingModule } from './friends-view-routing.module';
import { DropdownUsersComponent } from './components/dropdown-users/dropdown-users.component';
import { FriendsHandlerComponent } from './components/friends-handler/friends-handler.component';

@NgModule({
	declarations: [
		FriendsViewComponent,
		DropdownUsersComponent,
  		FriendsHandlerComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		FriendsViewRoutingModule,
		ReactiveFormsModule,
		MatSelectModule,
	]
})
export class FriendsViewModule { }
