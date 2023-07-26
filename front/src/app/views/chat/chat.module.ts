import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';

import { ChatroomsViewComponent } from './components/chatrooms-view/chatrooms-view.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { ChatroomsComponent } from './components/chatrooms/chatrooms.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [
		ChatroomsViewComponent,
		ChatroomComponent,
		ChatroomsComponent
	],
	imports: [
		CommonModule,
		ChatRoutingModule,
		SharedModule
	]
})
export class ChatModule { }
