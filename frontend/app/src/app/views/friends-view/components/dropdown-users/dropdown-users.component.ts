import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../core/models/user.model';

@Component({
  	selector: 'app-dropdown-users',
  	templateUrl: './dropdown-users.component.html',
  	styleUrls: ['./dropdown-users.component.css']
})
export class DropdownUsersComponent {

	@Input() users!: User[];
	@Output() userClicked = new EventEmitter<User>();

	selectUser(user: User) : void {
		this.userClicked.emit(user);
	}
}
