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

	matchHistory$!: Observable<MatchHistory[]>;
	userId!: number;
	
	constructor (private matchHistService: MatchHistoryService) {};
	
	ngOnInit(): void {
		this.userId = 1; // placeholder, change that after
		this.matchHistory$ = this.matchHistService.getHardcodedGameHistory(); // change that
	}
}
