import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-chatroom-session',
	templateUrl: './chatroom-session.component.html',
	styleUrls: ['./chatroom-session.component.css']
})
export class ChatroomSessionComponent implements OnInit {

	chatroomId!: number;
	
	constructor (private route: ActivatedRoute) {};

	ngOnInit(): void {
		const id: string | null = this.route.snapshot.paramMap.get('id');
		
		if (id) {
			this.chatroomId= +id;			
		}
		else
			; // raise error there;
	}
}
