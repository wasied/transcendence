import { Component, OnInit } from '@angular/core';
import { Achievement } from 'src/app/models/achievement.model';
import { AchievementsService } from 'src/app/services/achievements.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  
  achievements!: Achievement[];
  
  constructor (private achievementsService: AchievementsService) {}

  ngOnInit(): void {
    this.achievements = this.achievementsService.achievements;
  }
}
