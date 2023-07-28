import { Component, Input } from '@angular/core';
import { Achievement } from 'src/app/core/models/achievement.model';

@Component({
	selector: 'app-achievement',
	templateUrl: './achievement.component.html',
	styleUrls: ['./achievement.component.css']
})
export class AchievementComponent {
  
	@Input () achievement!: Achievement;
}
