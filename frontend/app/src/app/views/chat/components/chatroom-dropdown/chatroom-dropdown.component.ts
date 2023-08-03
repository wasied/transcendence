import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChatroomsService } from 'src/app/core/services/chatrooms.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
	selector: 'app-chatroom-dropdown',
	templateUrl: './chatroom-dropdown.component.html',
	styleUrls: ['./chatroom-dropdown.component.css']
})
export class ChatroomDropdownComponent {

	@Input() participants!: string[];
	isOpen: boolean = false;

	constructor (private usersService: UsersService,
				 private chatroomsService: ChatroomsService,
				 private router: Router) {}

	toggleDropdown(): void {
		this.isOpen = !this.isOpen;
	}

	// check if 1) user is a owner or administrator, 2) target is not
	isAllowedToCoerce(participant: string) : boolean {
		return true; // implement logic later
	}

	kickUser(participant: string) : void {
		console.log('kick user : not yet implemented');
	}

	banUser(participant: string) : void {
		console.log('ban user: feature not yet implemented');
	}

	muteUser(participant: string) : void {
		console.log('mute user : feature not yet implemented');
	}

	blockUser(participant: string) : void {
		console.log('block user : feature not yet implemented');
	}

	seeUserProfile(participant: string) : void {
		console.log('feature not implemented yet');
	}

	playWithUser(participant: string) : void {
		console.log('feature not implemented yet');
	}

	makeAdmin(participant: string) : void {
		console.log('make admin : feature not implemented yet');
	}

	isAllowedToElevateToAdmin(participant: string) : boolean {
		console.log('check if can elevate to admin : feature not implemented yet');
		return true;
	}
}
