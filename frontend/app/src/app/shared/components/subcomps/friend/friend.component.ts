import { Component, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
	selector: 'app-friend',
	templateUrl: './friend.component.html',
	styleUrls: ['./friend.component.css']
})
export class FriendComponent {
	
	@Input() friend!: User;
}
