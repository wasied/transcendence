import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ChatroomsService } from 'src/app/core/services/chatrooms.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable, Subscription } from 'rxjs';
import { httpErrorHandler } from 'src/app/http-error-handler';
import { User } from 'src/app/core/models/user.model';

@Component({
	selector: 'app-chatroom-dropdown',
	templateUrl: './chatroom-dropdown.component.html',
	styleUrls: ['./chatroom-dropdown.component.css']
})
export class ChatroomDropdownComponent implements OnInit, OnDestroy {

	@Input() chatroomId!: number;
	@Input() participants!: User[];
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
		this.chatroomsService.kickUserFromChatroom(this.chatroomId, participantId).subscribe(
			data => {},
			httpErrorHandler
		);
	}

	banUser(participantId: number) : void {
		// this.chatroomsService.banUserFromChatroom(this.chatroomId, participantId).subscribe(
		//	data => {},
		//	httpErrorHandler
		//);
	}

	muteUser(participantId: number) : void {
		// this.chatroomsService.muteUserFromChatroom(this.chatroomId, participantId).subscribe(
		//	data => {},
		//	httpErrorHandler
		//);
	}

	blockUser(participantId: number) : void {
		this.usersService.blockUser(participantId).subscribe(
			data => {},
			httpErrorHandler
		);
	}

	seeUserProfile(participantId: number) : void {
		this.router.navigate(['main', 'profile', participantId]);
	}


	makeAdmin(participantId: number) : void {
		this.chatroomsService.makeUserAnAdmin(this.chatroomId, participantId).subscribe(
			data => {},
			httpErrorHandler
		);
	}

	makeNonAdmin(participantId: number) : void {
		this.chatroomsService.makeUserANonAdmin(this.chatroomId, participantId).subscribe(
			data => {},
			httpErrorHandler
		);
	}


	isAllowedToElevateToAdmin(participantId: number) : boolean {
		// backend will block if the user is not allowed
		return true;
	}


	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
