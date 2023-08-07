import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChatroomsService } from 'src/app/core/services/chatrooms.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-chatroom-dropdown',
	templateUrl: './chatroom-dropdown.component.html',
	styleUrls: ['./chatroom-dropdown.component.css']
})
export class ChatroomDropdownComponent implements OnInit, OnDestroy {

	@Input() chatroomId!: number;
	@Input() participants!: string[];
	@Input() participantsId!: number[];

	isOpen: boolean = false;
	
	isAllowedToCoerce$!: Observable<boolean>;
	canCoerce!: boolean;

	private subscription!: Subscription;

	constructor (private usersService: UsersService,
				 private chatroomsService: ChatroomsService,
				 private router: Router) {}

	ngOnInit(): void {
		// this.subscription = this.chatroomsService. .subscribe(canCoerce => {
		// 	this.canCoerce = canCoerce;
		// });
	}
	
	toggleDropdown(): void {
		this.isOpen = !this.isOpen;
	}

	// check if 1) user is a owner or administrator, 2) target is not
	isAllowedToCoerce(participantId: number) : boolean {
		return true; // implement logic later, using a websocket
	}

	kickUser(participantId: number) : void {
		// this.chatroomsService.kickUserFromChatroom(this.chatroomId, participantId);
	}

	banUser(participantId: number) : void {
		// this.chatroomsService.banUserFromChatroom(this.chatroomId, participantId);
	}

	muteUser(participantId: number) : void {
		// this.chatroomsService.muteUserFromChatroom(this.chatroomId, participantId);
	}

	blockUser(participantId: number) : void {
		// this.usersService.blockUser(participantId);
	}

	seeUserProfile(participantId: number) : void {
		this.router.navigate(['main', 'profile', participantId]);
	}

	playWithUser(participantId: number) : void {
		console.log('feature not implemented yet');
	}

	makeAdmin(participantId: number) : void {
		// this.chatroomsService.makeUserAnAdmin(this.chatroomId, participantId);
	}

	makeNonAdmin(participantId: number) : void {
		// this.chatroomsService.makeUserAnAdmin(this.chatroomId, participantId);
	}

	isAllowedToElevateToAdmin(participantId: number) : boolean {
		console.log('check if can elevate to admin : feature not implemented yet');
		return true;
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
