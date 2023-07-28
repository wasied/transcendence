import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/core/models/friend.model'; 
import { FriendService } from 'src/app/core/services/friends.service'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-friends-view',
  templateUrl: './friends-view.component.html',
  styleUrls: ['./friends-view.component.css']
})
export class FriendsViewComponent {
  friends: any[] = []; // Store the friends' data

  constructor (private http: HttpClient) {}

  private apiURL : string = 'http://localhost:3000/friends';
  
  ngOnInit(): void {
        this.getFriends();
      }
  getFriends(): void {
    this.http.get<any>(this.apiURL).subscribe(friends => {
      this.friends = friends;
    });
  }
}
