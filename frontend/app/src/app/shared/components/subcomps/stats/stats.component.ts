import { Component, Input, OnInit } from '@angular/core';
import { Stat } from 'src/app/core/models/stat.model'; 
import { StatsService } from 'src/app/core/services/stats.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

	@Input() userId!: number;
	stats!: Observable<Stat>;

  	constructor (private statsService: StatsService) {}
  
  	ngOnInit(): void {
		this.stats = this.statsService.getStats();
  	}

	loadStatofCurrentUser() : void { // use that instead
		this.stats = this.statsService.getStats();
	}
}
