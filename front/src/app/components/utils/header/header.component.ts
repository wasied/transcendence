import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$!: Observable<User>;
  
  constructor (private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {}
  
  ngOnInit(): void {
    this.getUserData();
  }

  // retrieve the user: User object to exploit the data
  getUserData() : void {
    const userId: number = +this.route.snapshot.params['id'];
    this.user$ = this.userService.getUserById(userId);
  }

  onClickOnChatrooms() : void {
    this.router.navigate(['main', this.user.id, 'chatrooms']);
  }

  onClickOnMessages() : void {
    this.router.navigate(['main', this.user.id, 'direct_messages']);
  }

  onClickOnFriends() : void {
    this.router.navigate(['main', this.user.id, 'friends']);
  }

  onClickOnProfilePicture() : void {
    this.router.navigate(['main', this.user.id, 'profile', this.user.id]);
  }

  onClickPlay() : void {
    
  }
}
