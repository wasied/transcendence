import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DirectMessagesRoutingModule } from './direct-messages-routing.module';

import { DirectMessagesViewComponent } from './components/direct-messages-view/direct-messages-view.component';
import { DirectMessageComponent } from './components/direct-message/direct-message.component';
import { DirectMessagesComponent } from './components/direct-messages/direct-messages.component';
import { DirectMessageSessionComponent } from './components/direct-message-session/direct-message-session.component';
import { DirectMessagesHeaderComponent } from './components/direct-messages-header/direct-messages-header.component';

@NgModule({
	declarations: [
		DirectMessagesViewComponent,
    	DirectMessageComponent,
    	DirectMessagesComponent,
     	DirectMessageSessionComponent,
      	DirectMessagesHeaderComponent
  ],
	imports: [
		CommonModule,
    	SharedModule,
		DirectMessagesRoutingModule
  	]
})
export class DirectMessagesModule { }
