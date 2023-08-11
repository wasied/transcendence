import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { httpErrorHandler } from 'src/app/http-error-handler';
import { User } from 'src/app/core/models/user.model';

@Component({
	selector: 'app-profile-self',
	templateUrl: './profile-self.component.html',
	styleUrls: ['./profile-self.component.css']
})
export class ProfileSelfComponent implements OnInit {
	
	user$!: Observable<User>;
	idOfUserProfile!: number;

	constructor (
		private usersService: UsersService,
		private router: Router
	) {};

	ngOnInit(): void {
		this.user$ = this.usersService.getMe();
	}

	goToGameHistory() : void {
		this.router.navigate(['main', 'profile', 'match_history']);
	}
}
