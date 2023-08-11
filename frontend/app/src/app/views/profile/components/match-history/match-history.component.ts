import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchHistoryService } from 'src/app/core/services/match-history.service';
import { MatchHistory } from 'src/app/core/models/match-history.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
	selector: 'app-match-history',
	templateUrl: './match-history.component.html',
	styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {

	@Input() isProfileOfUser!: boolean;
	@Input() userId!: number;
	
	realUserId!: number;
	matchHistory$!: Observable<MatchHistory[]>;
	
	constructor (private matchHistService: MatchHistoryService) {};
	
	ngOnInit(): void {
		this.matchHistory$ = this.matchHistService.getUserHistory(this.userId);
	}
}
