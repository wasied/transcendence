import { Component, Input } from '@angular/core';
import { MatchHistory } from 'src/app/core/models/match-history.model';
import { Router } from '@angular/router';
import { AccessControlService } from 'src/app/core/services/access-control.service';

@Component({
	selector: 'app-match-history-elem',
	templateUrl: './match-history-elem.component.html',
	styleUrls: ['./match-history-elem.component.css']
})
export class MatchHistoryElemComponent {

	@Input() matchHistoryElem!: MatchHistory;

	constructor (private router: Router, private accessControlService: AccessControlService) {};

	/* GUARD */

	grantAccess(): void {
		this.accessControlService.setAccess(true);
		}
	
	goToOpponentProfile(opponentId: number) : void {
		this.accessControlService.setAccess(true);
		this.router.navigate(['main', 'profile', opponentId]);
	}
}
