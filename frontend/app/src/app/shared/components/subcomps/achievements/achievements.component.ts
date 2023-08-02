import { Component, Input, OnInit } from '@angular/core';
import { Achievement } from 'src/app/core/models/achievement.model';
import { AchievementsService } from 'src/app/core/services/achievements.service'; 
import { Observable } from 'rxjs';

@Component({
	selector: 'app-achievements',
	templateUrl: './achievements.component.html',
	styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  
	@Input() userId!: number;
	achievements$!: Observable<Achievement[]>;

	constructor (private achievementsService: AchievementsService) {}

	ngOnInit(): void {
		this.achievements$ = this.loadAchievements();
	}

	loadAchievements() : Observable<Achievement[]> {
		return this.achievementsService.getHarcodedAchievements(); // change this
	}
}
