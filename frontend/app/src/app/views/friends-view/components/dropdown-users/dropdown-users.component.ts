import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { catchError, Observable, map, of } from 'rxjs';
import { FriendService } from 'src/app/core/services/friends.service';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from '../../../../core/models/user.model';
import { httpErrorHandler } from 'src/app/http-error-handler';

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
