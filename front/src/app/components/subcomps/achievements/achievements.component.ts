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
  
  constructor (private achievementsService: AchievementsService,
               private usersService: UsersService) {}

  achievements$!: Observable<Achievement[]>;
  

  ngOnInit(): void {
    const currentUserId: number = this.usersService.getCurrentUserId();
    this.achievements$ = this.achievementsService.getAllAchievements(); // change this after to 
    // display only player achievements
  }
}
