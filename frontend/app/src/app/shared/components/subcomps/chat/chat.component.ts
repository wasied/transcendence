import { Component, ViewChild, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/core/models/message.model'; 
import { MessagesService } from 'src/app/core/services/messages.service';
import { MessagesWebsocketService } from 'src/app/core/services/messages-websocket.service';
import { ActivatedRoute } from '@angular/router';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
	
	@ViewChild('messageList', { static: false }) messageList!: ElementRef;
 
	chatroomId!: number;
	messages$!: Observable<Message[]>;
	messages!: Message[];
	newMessageText: string = '';
	sender!: string;

	constructor (
		private messagesService: MessagesService,
		private route: ActivatedRoute,
		public messagesWebsocketService: MessagesWebsocketService
	) {}

	ngOnInit(): void {
		const id: string | null = this.route.snapshot.paramMap.get('id');
		if (id)
			this.chatroomId = +id;
		else {
			console.error("Invalid chatroom id");
			return ;
		}
		this.messagesWebsocketService.connect(this.chatroomId);
	}

	private loadMessages() : void {
		this.messages$ = this.messagesService.getAllHardcodedMessages();
	}
	
	addMessage(inputMessage: string) : void {
    	inputMessage = inputMessage.trim();

    	if (inputMessage.length === 0) {
    		return;
    	}
    
		this.messagesService.sendMessageToDB(inputMessage, this.chatroomId).subscribe(
			data => {},
			httpErrorHandler
		);
		this.newMessageText = '';
    	setTimeout(() => this.scrollToBottom(), 0);
	}

	/* display messages from most recent to oldest */
  	scrollToBottom(): void {
    	try {
      		this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
    	} catch(error) { 
      		console.log(error);
    	}
  	}

	ngOnDestroy() {
		this.messagesWebsocketService.disconnect(this.chatroomId);
	}
}
