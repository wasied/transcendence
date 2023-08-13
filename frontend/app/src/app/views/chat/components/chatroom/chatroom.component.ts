import { Component, Input, Output, ViewEncapsulation, EventEmitter, 
	AfterViewInit, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Chatroom } from 'src/app/core/models/chatroom.model'; 
import tippy from 'tippy.js';
import { ChatroomsService } from 'src/app/core/services/chatrooms.service';
import { ChatWebsocketService } from 'src/app/core/services/chat-websocket.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccessControlService } from 'src/app/core/services/access-control.service';

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
	
	private destroyed: boolean = false;
	private subscriptions: Subscription = new Subscription();
	
	showParticipants: boolean = false;
	isModalOpen: boolean = false;

	accessForm!: FormGroup;

	constructor(
		private router: Router,
		private elementRef: ElementRef,
		private chatroomsService: ChatroomsService,
		private formBuilder : FormBuilder,
		private chatWebsocketService: ChatWebsocketService,
		private accessControlService: AccessControlService
	)
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

	toggleParticipants() {
		this.showParticipants = !this.showParticipants;
		this.initializeTooltips();
	}

	/* GUARD */

	grantAccess(): void {
		this.accessControlService.setAccess(true);
		}

	accessChatroom(chatroomId: number) : void {
		if (this.chatroom.password !== null) {
			this.openModal();
		} else {
			this.accessControlService.setAccess(true);
			//this.router.navigate(['main/chatrooms', chatroomId]);
			this.chatWebsocketService.joinRoom(chatroomId, null);
		}
	}

	handlePasswordProtection() : void {
		const password: string | null = this.accessForm.get('accessPassword')?.value;

		this.closeModal();

		if (password) {
			this.onSubmitPassword(this.chatroom.id, password);
		}
	}

	onSubmitPassword(chatroomId: number, password: string) : void {
		this.accessControlService.setAccess(true);
		this.chatWebsocketService.joinRoom(chatroomId, password);
	}
	
	deleteChatroom() : void {
		this.deleteRequest.emit(this.chatroom);
	}

	ngOnDestroy(): void {
		if (this.destroyed) return;
		this.destroyed = true;

		if (this.subscriptions) {
			this.subscriptions.unsubscribe();
		}
	}

	/* MODAL HANDLING */

	openModal() : void {
		this.isModalOpen = true;
	}

	closeModal() : void {
		this.isModalOpen = false;
	}

	/* CONTROLS */
	@HostListener('window:beforeunload', ['$event'])
	unloadHandler(event: any) {
		this.ngOnDestroy();
	}

}
