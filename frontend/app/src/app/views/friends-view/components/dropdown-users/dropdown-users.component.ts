import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from '../../../../core/models/user.model';

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
		this.users$ = this.usersService.getHardcodedUsers().pipe( // replace getHardcodedUsers()
			map(users => users.filter(user => user.id !== this.currentUserId))
		);
	}

	addUserAsFriend(userId: number) {
		// Logic to add a user as a friend
	}
}
