import { Component, OnInit, Input } from '@angular/core';
import { Friend } from 'src/app/core/models/friend.model'; 
import { FriendService } from 'src/app/core/services/friends.service'; 
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service'; 

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  //@Input() user: string;
  friends$!: Observable<Friend[]>;

  constructor (private friendsService: FriendService,
               private usersService: UsersService) {}
  
  ngOnInit(): void {
    this.friends$ = this.loadFriends();
  }

  loadFriends() : Observable<Friend[]> {
    return (this.friendsService.getHardcodedFriends());
  }
}