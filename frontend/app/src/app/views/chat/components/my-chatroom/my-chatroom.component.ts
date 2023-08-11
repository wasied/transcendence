import { Component, Input, Output, ViewEncapsulation, EventEmitter, 
	AfterViewInit, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Chatroom } from 'src/app/core/models/chatroom.model'; 
import tippy from 'tippy.js';
import { ChatroomsService } from '../../../../core/services/chatrooms.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-my-chatroom',
	templateUrl: './my-chatroom.component.html',
	styleUrls: ['./my-chatroom.component.css'],
	encapsulation: ViewEncapsulation.None,  // Needed to apply tooltip CSS
})
export class MyChatroomComponent implements OnInit, OnDestroy, AfterViewInit {
  
	@Input () chatroom!: Chatroom;
	@Output() deleteRequest = new EventEmitter<Chatroom>();

	isOwner$!: Observable<boolean>;
	
	private subscriptions: Subscription = new Subscription();
	
	showParticipants: boolean = false;

	accessForm!: FormGroup;

	constructor(private router: Router, 
				private elementRef: ElementRef,
				private chatroomsService: ChatroomsService,
				private formBuilder : FormBuilder) 
	{
		this.accessForm = this.formBuilder.group({
			accessPassword : ['']
		});
	}

	ngOnInit() : void {
		this.isOwner$ = this.chatroomsService.amIChatroomOwner(this.chatroom.id);
		for (const participant of this.chatroom.participants) {
			if (this.chatroom.owner_uid === participant.id)
				this.chatroom.owner_username = participant.username;
		}
	}
	
	ngAfterViewInit() : void {
		/* Button Tooltip */
		this.initializeTooltips()
	}

	initializeTooltips() : void {
		tippy(this.elementRef.nativeElement.querySelector('#joinChatRoom'), {
			content: 'Enter the ChatRoom',
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

	toggleParticipants() {
		this.showParticipants = !this.showParticipants;
		this.initializeTooltips();
	}

	enterChatroom(chatroomId: number) : void {
		console.log('OKOK', chatroomId);
		this.router.navigate(['main/chatrooms', chatroomId]);
	}

	deleteChatroom() : void {
		this.deleteRequest.emit(this.chatroom);
	}

	ngOnDestroy(): void {
		if (this.subscriptions) {
			this.subscriptions.unsubscribe();
		}
	}
}
