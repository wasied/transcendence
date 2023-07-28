import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-chatroom-dropdown',
	templateUrl: './chatroom-dropdown.component.html',
	styleUrls: ['./chatroom-dropdown.component.css']
})
export class ChatroomDropdownComponent {

	@Input() participants!: string[];
	isOpen: boolean = false;

	toggleDropdown(): void {
		this.isOpen = !this.isOpen;
	}
}
