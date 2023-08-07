import { Component, Input, Output, ViewEncapsulation, EventEmitter, AfterViewInit, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Chatroom } from 'src/app/core/models/chatroom.model'; 
import tippy from 'tippy.js';
import { UsersService } from '../../../../core/services/users.service';

@Component({
	selector: 'app-chatroom',
	templateUrl: './chatroom.component.html',
	styleUrls: ['./chatroom.component.css'],
	encapsulation: ViewEncapsulation.None,  // Needed to apply tooltip CSS
})
export class ChatroomComponent implements OnInit, OnDestroy, AfterViewInit {
  
	@Input () chatroom!: Chatroom;
	@Output() deleteRequest = new EventEmitter<Chatroom>();

	isOwner$!: Observable<boolean>;
	isOwner: boolean = false; // change that to use with Observable<boolean>
	private subscription!: Subscription;

	constructor(private router: Router, 
				private elementRef: ElementRef,
				private usersService: UsersService) {}

	ngOnInit() : void {
		// this.isOwner$ = this.usersService.isUserOwnChatroom(this.chatroom.id);
		// this.subscription = this.isOwner$.subscribe(isOwner => {
		// 	this.isOwner = isOwner;
		// });
	}
	
	ngAfterViewInit() : void {
		// Button Tooltip
		this.initializeTooltips()
	}

	initializeTooltips() : void {
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
	
	deleteChatroom() : void {
		this.deleteRequest.emit(this.chatroom);
	}

	ngOnDestroy(): void {
		// if (this.subscription) {
		// 	this.subscription.unsubscribe();
		// }
	}
}
