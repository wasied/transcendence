import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatchHistory } from 'src/app/core/models/match-history.model';
import { Router } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-match-history-elem',
	templateUrl: './match-history-elem.component.html',
	styleUrls: ['./match-history-elem.component.css']
})
export class MatchHistoryElemComponent implements OnChanges {

	@Input() matchHistoryElem!: MatchHistory;
	matchHistory$!: Observable<MatchHistory>;

	constructor (private router: Router, private usersService: UsersService) {};

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['userId'] && changes['userId'].currentValue) {
			this.user$ = this.usersService.getUserById(changes['userId'].currentValue);
		}
	}

	goToOpponentProfile(opponentId: number) : void {
		this.router.navigate(['main', 'profile', opponentId]);
	}
}
