import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: User;
  
  constructor (private userService: UserService,
    private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() : void {
    const userId = this.route.snapshot.params['id'];
    console.log(userId);
    this.user = this.userService.getUserById(userId);
    // console.log(this.user.id);
  }
}
