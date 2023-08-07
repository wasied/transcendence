import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-profile-other',
	templateUrl: './profile-other.component.html',
	styleUrls: ['./profile-other.component.css']
})
export class ProfileOtherComponent implements OnInit, OnDestroy {

	idOfUserProfile!: number;
	userBlocked!: boolean;
	isUserBlocked$!: Observable<boolean>;
	private subscription!: Subscription;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private usersService: UsersService) {};
	
	ngOnInit(): void {
		const id: string | null = this.route.snapshot.paramMap.get('id');

		if (id) {
			console.log(id);
			this.idOfUserProfile = +id;
		} else
			; // raise error

		// this.isUserBlocked$ = this.usersService.isUserBlocked(this.idOfUserProfile);
		// this.subscription = this.isUserBlocked$.subscribe((isBlocked) => {
		// 	this.userBlocked = isBlocked;
		// });
	}

	goToGameHistory() : void {
		this.router.navigate(['main', 'profile', 'match_history', this.idOfUserProfile]);
	}

	blockUser() : void {		
		// this.usersService.blockUser(this.idOfUserProfile);
	}

	unblockUser() : void {
		// this.usersService.unblockUser(this.idOfUserProfile);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
