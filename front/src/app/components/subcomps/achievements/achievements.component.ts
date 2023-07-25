import { Component, OnInit } from '@angular/core';
import { Achievement } from 'src/app/models/achievement.model';
import { AchievementsService } from 'src/app/services/achievements.service';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-achievements',
	templateUrl: './achievements.component.html',
	styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  
	achievements$!: Observable<Achievement[]>;

	constructor (private achievementsService: AchievementsService,
				 private usersService: UsersService) {}

	ngOnInit(): void {
		this.achievements$ = this.loadAchievements();
	}

	loadAchievements() : Observable<Achievement[]> {
		return this.achievementsService.getHarcodedAchievements();
	}
}
