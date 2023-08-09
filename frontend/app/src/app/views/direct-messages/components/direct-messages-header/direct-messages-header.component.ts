import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DirectMessagesService } from 'src/app/core/services/direct-messages.service';
import { Chatroom } from 'src/app/core/models/chatroom.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-direct-messages-header',
	templateUrl: './direct-messages-header.component.html',
	styleUrls: ['./direct-messages-header.component.css']
})
export class DirectMessagesHeaderComponent implements OnInit {

	participants$!: Observable<Chatroom>;
	invitation$!: Observable<number>;
	@Input() chatroomId!: number;
	isModalInviteOpen: boolean = false;
	isModalAcceptOpen: boolean = false;
	
	constructor (private router: Router,
				 private dmService: DirectMessagesService) {};

	ngOnInit(): void {
		this.participants$ = this.dmService.getHardcodedDirectMessageById(this.chatroomId);
	}
	
	onQuitDMSession() : void {
		this.router.navigate(['main/direct_messages']);
	}

	onOpenInviteMenu() : void {
		this.openInviteModal();
	}

	/* HANDLING ACCEPTATION REQUEST */

	refuseInvite() : void {
		this.closeAcceptModal();
	}

	acceptInvite() : void {
		// here, retrieve data from the socket, trigger the router to the game
		console.log('implement with a websocket !!!');
	}

	/* MODAL HANDLING */

	openInviteModal() : void {
		this.isModalInviteOpen = true;
	}

	closeInviteModal() : void {
		this.isModalInviteOpen = false;
	}

	openAcceptModal() : void {
		this.isModalAcceptOpen = true;
	}

	closeAcceptModal() : void {
		this.isModalAcceptOpen = false;
	}
}
