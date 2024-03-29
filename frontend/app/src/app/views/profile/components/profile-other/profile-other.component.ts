import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable, Subscription } from 'rxjs';
import { httpErrorHandler } from 'src/app/http-error-handler';
import { AccessControlService } from 'src/app/core/services/access-control.service';

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
	routingError: boolean = false;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private usersService: UsersService,
				private accessControlService: AccessControlService ) {};
	
	async ngOnInit(): Promise<void> {
		const id: string | null = this.route.snapshot.paramMap.get('id');

		if (id) {
			this.idOfUserProfile = +id;
		} else {
			console.error("Invalid user id");
			return ;
		}

		const user = await this.usersService.getUserById(+id).toPromise() 
		.catch(err  => {this.routingError = true});
		if (this.routingError) {
			this.router.navigate(['not-found']);
		}
	}

	/* GUARD */

	grantAccess(): void {
		this.accessControlService.setAccess(true);
		}

	goToGameHistory() : void {
		this.accessControlService.setAccess(true);
		this.router.navigate(['main', 'profile', 'match_history', this.idOfUserProfile]);
	}

	blockUser() : void {		
		this.usersService.blockUser(this.idOfUserProfile).subscribe(
			data => {},
			httpErrorHandler
		);
	}

	unblockUser() : void {
		this.usersService.unblockUser(this.idOfUserProfile).subscribe(
			data => {},
			httpErrorHandler
		);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
