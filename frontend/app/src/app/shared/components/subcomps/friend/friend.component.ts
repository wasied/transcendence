import { Component, Input } from '@angular/core';
import { Friend } from 'src/app/core/models/friend.model'; 

@Component({
	selector: 'app-friend',
	templateUrl: './friend.component.html',
	styleUrls: ['./friend.component.css']
})
export class FriendComponent {
	
	@Input() friend!: Friend;
}
