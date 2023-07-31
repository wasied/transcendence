import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend.model';
import { FriendService } from 'src/app/services/friends.service';
import { Observable } from 'rxjs';
import axios from '../../../axios';

@Component({
  selector: 'app-friends-view',
  templateUrl: './friends-view.component.html',
  styleUrls: ['./friends-view.component.css']
})
export class FriendsViewComponent {
  friends: any[] = []; // Store the friends' data

  constructor () {}

  private apiURI : string = '/users/friends';
  
  ngOnInit(): void {
        this.getFriends();
      }
  getFriends(): void {
    axios.get(this.apiURI)
    .then((response) => {
      this.friends = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
