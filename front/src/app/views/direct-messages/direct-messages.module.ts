import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectMessagesViewComponent } from './components/direct-messages-view/direct-messages-view.component';
import { DirectMessageComponent } from './components/direct-message/direct-message.component';
import { DirectMessagesComponent } from './components/direct-messages/direct-messages.component';

@NgModule({
  declarations: [
    DirectMessagesViewComponent,
    DirectMessageComponent,
    DirectMessagesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DirectMessagesModule { }
