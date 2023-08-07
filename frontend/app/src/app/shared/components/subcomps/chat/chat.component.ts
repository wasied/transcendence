import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/core/models/message.model'; 
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
	
	@ViewChild('messageList', { static: false }) messageList!: ElementRef;
 
	messages$!: Observable<Message[]>;
	newMessageText: string = '';
	sender!: string;

	constructor (private messagesService: MessagesService) {}

	ngOnInit(): void {
		this.loadMessages();
		// display with websocket
	}

	private loadMessages() : void {
		this.messages$ = this.messagesService.getAllHardcodedMessages();
	}
	
	addMessage(inputMessage: string) : void {
    	inputMessage = inputMessage.trim();

    	if (inputMessage.length === 0) {
    		return;
    	}
    
		//this.messagesService.sendMessageToDB(inputMessage, new Date(), this.chatroomId);
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
}
