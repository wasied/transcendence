import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  	selector: 'app-direct-message-session',
  	templateUrl: './direct-message-session.component.html',
  	styleUrls: ['./direct-message-session.component.css']
})
export class DirectMessageSessionComponent implements OnInit {

	constructor (private route: ActivatedRoute) {};
	chatroomId!: number; 
	
	ngOnInit(): void {
		const id: string | null = this.route.snapshot.paramMap.get('id');
		
		if (id) {
			this.chatroomId= +id;			
		}
		else
			console.error("No direct message id specified");
	}
}
