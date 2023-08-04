import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchHistoryService } from 'src/app/core/services/match-history.service';
import { MatchHistory } from 'src/app/core/models/match-history.model';

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
		this.determineUserId();
		this.matchHistory$ = this.matchHistService.getHardcodedGameHistory(); // change that by parseGameHistory
	}

	determineUserId() : void {
		if (this.isProfileOfUser === true) {
			this.realUserId = 1; // placeholder, change that will localStorage
		} else {
			this.realUserId = this.userId;
		}
	}

	parseGameHistory() : void {
		this.matchHistory$ = this.matchHistService.getGameHistory(this.realUserId);
	}
}
