import { Component, OnInit } from '@angular/core';
import { DirectMessage } from 'src/app/models/direct-message.model';
import { DirectMessagesSevice } from 'src/app/services/direct-messages.service';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.css']
})
export class DirectMessagesComponent implements OnInit {

  directMessages$!: Observable<DirectMessage[]>;

  constructor (private directMessageService: DirectMessagesSevice,
               private usersService: UsersService) {}
  
  ngOnInit(): void {
    const currentUserId: number = this.usersService.getCurrentUserId();
    this.directMessages$ = this.directMessageService.getAllDirectMsgs();
  }
}
