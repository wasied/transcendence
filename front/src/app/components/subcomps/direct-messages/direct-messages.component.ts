import { Component, OnInit } from '@angular/core';
import { DirectMessage } from 'src/app/models/direct-message.model';
import { DirectMessagesSevice } from 'src/app/services/direct-messages.service';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.css']
})
export class DirectMessagesComponent implements OnInit {

  directMessages!: DirectMessage[];

  constructor (private directMessageService: DirectMessagesSevice) {}
  
  ngOnInit(): void {
    this.directMessages = this.directMessageService.directMessages;
  }
}
