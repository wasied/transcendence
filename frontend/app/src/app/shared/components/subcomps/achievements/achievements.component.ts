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

	loadUserAchievements(userId: number) : Observable<Achievement[]> { // use this instead, with current user id
		return this.achievementsService.getUserAchievements(userId);
	}

	// Fonctions pour le design responsive
	getEmptyAchievementCount(achievements: any[]): number {
		const maxAchievements = 10;
		return Math.max(maxAchievements - achievements.length, 0);
	}
	
	createEmptyArray(count: number): any[] {
		return new Array(count);
	}
}
