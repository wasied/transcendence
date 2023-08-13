import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';

import { ChatroomsViewComponent } from './components/chatrooms-view/chatrooms-view.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { MyChatroomComponent } from './components/my-chatroom/my-chatroom.component';
import { ChatroomsComponent } from './components/chatrooms/chatrooms.component';
import { MyChatroomsComponent } from './components/my-chatrooms/my-chatrooms.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatroomDropdownComponent } from './components/chatroom-dropdown/chatroom-dropdown.component';
import { ChatroomSessionComponent } from './components/chatroom-session/chatroom-session.component';
import { ChatroomHeaderComponent } from './components/chatroom-header/chatroom-header.component';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatWebsocketService } from 'src/app/core/services/chat-websocket.service';

@NgModule({
	declarations: [
		ChatroomsViewComponent,
		ChatroomComponent,
		MyChatroomComponent,
		ChatroomsComponent,
		MyChatroomsComponent,
  		ChatroomDropdownComponent,
    	ChatroomSessionComponent,
     	ChatroomHeaderComponent
	],
	imports: [
		CommonModule,
		ChatRoutingModule,
		SharedModule,
		ReactiveFormsModule
	],
	providers: [ChatWebsocketService]
})
export class ChatModule { }
