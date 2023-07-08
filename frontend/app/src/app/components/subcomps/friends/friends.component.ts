import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend.model';
import { FriendService } from 'src/app/services/friends.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends$!: Observable<Friend[]>;

  constructor (private friendsService: FriendService) {}
  
  ngOnInit(): void {
    this.friends$ = this.friendsService.getCurrentUserFriends();
  }
}
