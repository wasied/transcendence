import { Component, Input } from '@angular/core';
import { DirectMessage } from 'src/app/core/models/direct-message.model'; 

@Component({
	selector: 'app-direct-message',
	templateUrl: './direct-message.component.html',
	styleUrls: ['./direct-message.component.css']
})
export class DirectMessageComponent {

	@Input() directMessage!: DirectMessage;

	goToDMSession() : void {
		
	}

	rmDMSession() : void {
		console.log('feature not implemented yet !');
	}

	blockDMSession() : void {
		console.log('feature not implemented yet !');
	}
}
