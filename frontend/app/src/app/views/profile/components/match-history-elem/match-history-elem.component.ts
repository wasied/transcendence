import { Component, Input } from '@angular/core';
import { MatchHistory } from 'src/app/core/models/match-history.model';

@Component({
	selector: 'app-match-history-elem',
	templateUrl: './match-history-elem.component.html',
	styleUrls: ['./match-history-elem.component.css']
})
export class MatchHistoryElemComponent {

	@Input() matchHistoryElem!: MatchHistory; 
}
