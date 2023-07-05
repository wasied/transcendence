import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users.service';
import { Stat } from 'src/app/models/stat.model';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  users!: User[];
  stats!: Stat[];

  constructor (private userService: UserService,
               private statsService: StatsService) {}
  
  ngOnInit(): void { // wip !
    // this.users = this.userService.users;
    // this.stats = this.statsService.stats;
  }

  // matchUserIdAndStats() : number {

  // }
}
