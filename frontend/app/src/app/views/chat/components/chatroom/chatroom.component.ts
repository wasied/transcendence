import { Component, Input, Output, ViewEncapsulation, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chatroom } from 'src/app/core/models/chatroom.model'; 
import tippy from 'tippy.js';

@Component({
	selector: 'app-chatroom',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.css'],
	encapsulation: ViewEncapsulation.None,  // Needed to apply tooltip CSS
})
export class ChatroomComponent {
  
	@Input () chatroom!: Chatroom;
	@Output() deleteRequest = new EventEmitter<Chatroom>();

	constructor(private router: Router, private elementRef: ElementRef) {}

	ngAfterViewInit() {
		// Button Tooltip
		this.initializeTooltips()
	}

	initializeTooltips() {
		tippy(this.elementRef.nativeElement.querySelector('#joinChatRoom'), {
			content: 'Join the ChatRoom',
			arrow: true,
			theme: 'custom-theme',
			duration: [100, 100],
			placement: 'bottom',
		});
		tippy(this.elementRef.nativeElement.querySelector('#showParticipants'), {
			content: 'Show Participants',
			arrow: true,
			theme: 'custom-theme',
			duration: [100, 100],
			placement: 'bottom',
		});
		tippy(this.elementRef.nativeElement.querySelector('#hideParticipants'), {
			content: 'Hide Participants',
			arrow: true,
			theme: 'custom-theme',
			duration: [100, 100],
			placement: 'bottom',
		});
		tippy(this.elementRef.nativeElement.querySelector('#lock'), {
			content: 'Lock the ChatRoom',
			arrow: true,
			theme: 'custom-theme',
			duration: [100, 100],
			placement: 'bottom',
		});
		tippy(this.elementRef.nativeElement.querySelector('#delete'), {
			content: 'Delete the ChatRoom',
			arrow: true,
			theme: 'custom-theme',
			duration: [100, 100],
			placement: 'bottom',
		});
	}

	showParticipants = false;
	toggleParticipants() {
		this.showParticipants = !this.showParticipants;
		this.initializeTooltips()
	}

	accessChatroom(chatroomId: number) : void {
		this.router.navigate(['main/chatrooms', chatroomId]);
	}
	
	// Ce serait sûrement mieux de delete en se basant sur l'ID => handled by chatrooms component :)
	deleteChatroom() : void {
		this.deleteRequest.emit(this.chatroom);
	}
}
