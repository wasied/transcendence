import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
	selector: 'app-direct-message-dropdown',
	templateUrl: './direct-message-dropdown.component.html',
	styleUrls: ['./direct-message-dropdown.component.css']
})
export class DirectMessageDropdownComponent {
	
	@Input() users!: User[];
	@Output() userClicked = new EventEmitter<User>();

	selectUser(user: User) : void {
		this.userClicked.emit(user);
	}
}
