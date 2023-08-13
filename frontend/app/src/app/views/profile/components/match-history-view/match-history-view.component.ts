import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessControlService } from 'src/app/core/services/access-control.service';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../../core/services/users.service';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-match-history-view',
	templateUrl: './match-history-view.component.html',
	styleUrls: ['./match-history-view.component.css']
})
export class MatchHistoryViewComponent implements OnInit, OnDestroy {

	idOfUserProfile!: number;
	isProfileOfUser: boolean = false;
	isIdSet: boolean = false;

	private subscription!: Subscription;
	
	constructor (private router: Router,
				 private route: ActivatedRoute,
				 private accessControlService: AccessControlService,
				 private usersService: UsersService) {};
	
	async ngOnInit(): Promise<void> {		
		if (this.isIdInURL() === true) {
			const id: string | null = this.route.snapshot.paramMap.get('id');

			if (id) {
				this.idOfUserProfile = +id;
			} else {
				console.error("Invalid user id");
				return ;
			}
		} else {
			this.isProfileOfUser = true;
			await this.getUserIdIfCurrent();
		}
		this.isIdSet = true;
	}

	private async getUserIdIfCurrent() : Promise<void> {
		const user = await this.usersService.getMe().toPromise()
			.catch(httpErrorHandler);
		if (user)
			this.idOfUserProfile = user.id;
	}

	private isIdInURL() : boolean {
		const lastSegment: string = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
		if ('match_history' === lastSegment)
			return false;
		return true;
	}


	/* GUARD */

	grantAccess(): void {
		this.accessControlService.setAccess(true);
		}

	goBackToProfile() : void {
		console.log('boolean = ', this.isProfileOfUser);
		if (this.isProfileOfUser) {
			this.router.navigate(['main', 'profile']);
		} else {
			this.accessControlService.setAccess(true);
			this.router.navigate(['main', 'profile', this.idOfUserProfile]);
		}
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
