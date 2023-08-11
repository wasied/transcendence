import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { SessionsUsersService } from './sessions-users.service';
import { SessionsService } from './sessions.service';

@Injectable({
	providedIn: 'root'
})
export class GameService {

	constructor (private usersService: UsersService,
				 private sessionsUsersService: SessionsUsersService,
				 private sessionsService: SessionsService) {};	

}
