import { Component, OnInit } from '@angular/core';
import { catchError, Observable, map, of } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from '../../../../core/models/user.model';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
  	selector: 'app-searchbar',
  	templateUrl: './dropdown-users.component.html',
  	styleUrls: ['./dropdown-users.component.css']
})
export class DropdownUsersComponent implements OnInit {

	users$!: Observable<User[]>;
  	currentUserId: number = 1; // Change this with real in localStorage

	constructor(private usersService: UsersService) {}

	ngOnInit(): void { 
		//this.users$ = this.usersService.getHardcodedUsers().pipe( // replace getHardcodedUsers()
		this.users$ = this.usersService.getAllUsers().pipe(
			map(users => users.filter(user => user.id !== this.currentUserId)),
			catchError(error => {
				httpErrorHandler(error);
				return of([]);
			})
		);
	}

	addUserAsFriend(userId: number) {
		// Logic to add a user as a friend
	}
}
