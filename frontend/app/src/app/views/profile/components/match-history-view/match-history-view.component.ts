import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../../core/services/users.service';

@Component({
	selector: 'app-match-history-view',
	templateUrl: './match-history-view.component.html',
	styleUrls: ['./match-history-view.component.css']
})
export class MatchHistoryViewComponent implements OnInit, OnDestroy {

	idOfUserProfile!: number;
	isProfileOfUser: boolean = false;

	private subscription!: Subscription;
	
	constructor (private router: Router,
				 private route: ActivatedRoute,
				 private usersService: UsersService) {};

	ngOnInit(): void {
		
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
			this.getUserIdIfCurrent();
			console.log(this.idOfUserProfile);
		}
	}

	private getUserIdIfCurrent() : void {
		this.subscription = this.usersService.getMe().subscribe(data=> {
			console.log('go there', data.id);
			this.idOfUserProfile = data.id;
			console.log(this.idOfUserProfile);
		});
	}

	private isIdInURL() : boolean {
		const lastSegment: string = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
		if ('match_history' === lastSegment)
			return false;
		return true;
	}

	goBackToProfile() : void {
		console.log('boolean = ', this.isProfileOfUser);
		if (this.isProfileOfUser) {
			this.router.navigate(['main', 'profile']);
		} else {
			this.router.navigate(['main', 'profile', this.idOfUserProfile]);
		}
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
