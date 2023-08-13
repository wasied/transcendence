import { Component, ViewChild, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { Message } from 'src/app/core/models/message.model'; 
import { MessagesWebsocketService } from 'src/app/core/services/messages-websocket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css'],
	providers: [MessagesWebsocketService]
})
export class ChatComponent implements OnInit, OnDestroy {
	
	@ViewChild('messageList', { static: false }) messageList!: ElementRef;
 
	chatroomId!: number;
	messages: Message[] = [];
	newMessageText: string = '';
	sender!: string;

	constructor (
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

		this.messagesWebsocketService.listenToServerEvents();
		this.messagesWebsocketService.connect(this.chatroomId);

		this.messagesWebsocketService.updateMessages$.subscribe(
			(data: any) => {
				for (const message of data) {
					message.created_at = new Date(message.created_at);
				}
				this.messages = data.reverse();
			}
		);
	}
	
	addMessage(inputMessage: string) : void {
    	inputMessage = inputMessage.trim();

    	if (inputMessage.length === 0) {
    		return;
    	}

		this.messagesWebsocketService.sendMessage(this.chatroomId, inputMessage);

		this.newMessageText = '';
    	setTimeout(() => this.scrollToBottom(), 0);
	}

	/* display messages from most recent to oldest */
  	scrollToBottom(): void {
    	try {
      		this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
		} catch(error) {
			console.error(error);
    	}
  	}

	ngOnDestroy() {
		this.messagesWebsocketService.updateMessages$.unsubscribe();
		this.messagesWebsocketService.disconnect(this.chatroomId);
	}
}
