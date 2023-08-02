import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DirectMessage } from 'src/app/core/models/direct-message.model'; 

@Component({
	selector: 'app-direct-message',
	templateUrl: './direct-message.component.html',
	styleUrls: ['./direct-message.component.css']
})
export class DirectMessageComponent {

	@Input() directMessage!: DirectMessage;

	constructor (private router: Router) {};

	goToDMSession(dmId: number) : void {
		this.router.navigate(['main/direct_messages', dmId]);
	}

	rmDMSession() : void {
		console.log('feature not implemented yet !');
	}

	blockDMSession() : void {
		console.log('feature not implemented yet !');
	}
}
