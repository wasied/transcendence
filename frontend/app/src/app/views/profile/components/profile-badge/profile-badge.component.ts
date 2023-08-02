import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-profile-badge',
	templateUrl: './profile-badge.component.html',
	styleUrls: ['./profile-badge.component.css']
})
export class ProfileBadgeComponent implements OnInit {

	@Input() userId!: number;
	@Input() buttonText!: string;
  	@Output() buttonAction: EventEmitter<void> = new EventEmitter<void>();
	user$!: Observable<User>;
	
	constructor (private usersService: UsersService) {};
	
	ngOnInit(): void {
		this.user$ = this.usersService.retrieveHardcodedUser(); // change this
	}
	
	onButtonClick(): void {
		this.buttonAction.emit();
	}
}
