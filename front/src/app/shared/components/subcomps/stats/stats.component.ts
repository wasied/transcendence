import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model'; 
import { UsersService } from 'src/app/core/services/users.service';
import { Stat } from 'src/app/core/models/stat.model'; 
import { StatsService } from 'src/app/core/services/stats.service'; 

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  users!: User[];
  stats!: Stat[];

  constructor (private usersService: UsersService,
               private statsService: StatsService) {}
  
  ngOnInit(): void { // wip !
    // this.users = this.userService.users;
    // this.stats = this.statsService.stats;
  }

  // matchUserIdAndStats() : number {

  // }
}
