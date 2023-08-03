import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-profile-other',
	templateUrl: './profile-other.component.html',
	styleUrls: ['./profile-other.component.css']
})
export class ProfileOtherComponent implements OnInit {

	idOfUserProfile!: number;

	constructor(private route: ActivatedRoute,
				private router: Router) {};
	
	ngOnInit(): void {
		const id: string | null = this.route.snapshot.paramMap.get('id');

		if (id) {
			console.log(id);
			this.idOfUserProfile = +id;
		} else
			; // raise error
	}

	goToGameHistory() : void {
		this.router.navigate(['main', 'profile', 'match_history', this.idOfUserProfile]);
	}
}
