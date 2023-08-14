import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatchHistory } from 'src/app/core/models/match-history.model';
import { Router } from '@angular/router';
import { AccessControlService } from 'src/app/core/services/access-control.service';
import { UsersService } from '../../../../core/services/users.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-match-history-elem',
	templateUrl: './match-history-elem.component.html',
	styleUrls: ['./match-history-elem.component.css']
})
export class MatchHistoryElemComponent {

	@Input() matchHistoryElem!: MatchHistory;
	matchHistory$!: Observable<MatchHistory>;

	constructor (private router: Router, private usersService: UsersService, private accessControlService: AccessControlService) {};

	// ngOnChanges(changes: SimpleChanges): void {
	// 	if (changes['userId'] && changes['userId'].currentValue) {
	// 		this.match$ = this.usersService.getUserById(changes['userId'].currentValue);
	// 	}
	// }

	/* GUARD */

	grantAccess(): void {
		this.accessControlService.setAccess(true);
	}
	
	goToOpponentProfile(opponentId: number) : void {
		this.accessControlService.setAccess(true);
		this.router.navigate(['main', 'profile', opponentId]);
	}
}
