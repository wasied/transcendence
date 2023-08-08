import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DirectMessagesService } from 'src/app/core/services/direct-messages.service';
import { DirectMessage } from 'src/app/core/models/direct-message.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-direct-messages-header',
	templateUrl: './direct-messages-header.component.html',
	styleUrls: ['./direct-messages-header.component.css']
})
export class DirectMessagesHeaderComponent implements OnInit {
	
	participants$!: Observable<DirectMessage>;
	@Input() chatroomId!: number;
	
	constructor (private router: Router,
				 private dmService: DirectMessagesService) {};

	ngOnInit(): void {
		this.participants$ = this.dmService.getHardcodedDirectMessageById(this.chatroomId);
	}
	
	onQuitDMSession() : void {
		this.router.navigate(['main/direct_messages']);
	}
}
