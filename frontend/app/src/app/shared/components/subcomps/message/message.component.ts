import { Component, Input } from '@angular/core';
import { DisplayMsgTimestampPipe } from 'src/app/shared/display-msg-timestamp.pipe'; 

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.css']
})
export class MessageComponent {
	@Input() text!: string;
	@Input() timestamp!: Date;
	@Input() sender!: string;
	@Input() photoUrl!: string;
}
