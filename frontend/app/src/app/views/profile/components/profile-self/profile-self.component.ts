import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile-self',
	templateUrl: './profile-self.component.html',
	styleUrls: ['./profile-self.component.css']
})
export class ProfileSelfComponent {
	
	idOfUserProfile!: number;

	constructor (private router: Router) {};

	ngOnInit(): void {
		this.idOfUserProfile = 1; // temporary, retrieve the id from sessionStorage
	}

	goToGameHistory() : void {
		this.router.navigate(['main', 'profile', 'match_history']);
	}
}
