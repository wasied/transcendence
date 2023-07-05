import { Component, OnInit } from '@angular/core';
import { Achievement } from 'src/app/models/achievement.model';
import { AchievementsService } from 'src/app/services/achievements.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  
  constructor (private achievementsService: AchievementsService) {}

  achievements$!: Observable<Achievement[]>;

  ngOnInit(): void {
    this.achievements$ = this.achievementsService.getAllAchievements();
  }
}
