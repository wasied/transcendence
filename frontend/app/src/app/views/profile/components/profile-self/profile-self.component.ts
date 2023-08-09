import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-profile-self',
	templateUrl: './profile-self.component.html',
	styleUrls: ['./profile-self.component.css']
})
export class ProfileSelfComponent {
	
	idOfUserProfile!: number;

	constructor (
		private usersService: UsersService,
		private router: Router
	) {};

	ngOnInit(): void {
		this.usersService.getMe().subscribe(
			data => { this.idOfUserProfile = data.id; },
			httpErrorHandler
		);
	}

	goToGameHistory() : void {
		this.router.navigate(['main', 'profile', 'match_history']);
	}
}
