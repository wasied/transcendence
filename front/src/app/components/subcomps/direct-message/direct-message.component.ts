import { Component, Input } from '@angular/core';
import { DirectMessage } from 'src/app/models/direct-message.model';

@Component({
	selector: 'app-direct-message',
	templateUrl: './direct-message.component.html',
	styleUrls: ['./direct-message.component.css']
})
export class DirectMessageComponent {

	@Input() directMessage!: DirectMessage;
}
