import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatroomsViewComponent } from './components/chatrooms-view/chatrooms-view.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { ChatroomsComponent } from './components/chatrooms/chatrooms.component';

@NgModule({
  declarations: [
    ChatroomsViewComponent,
    ChatroomComponent,
    ChatroomsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChatModule { }
