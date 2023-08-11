import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-profile-badge',
	templateUrl: './profile-badge.component.html',
	styleUrls: ['./profile-badge.component.css']
})
export class ProfileBadgeComponent implements OnChanges {

	@Input() userId!: number;
	@Input() buttonText!: string;
  	@Output() buttonAction: EventEmitter<void> = new EventEmitter<void>();
	user$!: Observable<User>;
	
	constructor (private usersService: UsersService) {};

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['userId'] && changes['userId'].currentValue) {
			this.user$ = this.usersService.getUserById(changes['userId'].currentValue);
		}
	}
	
	onButtonClick(): void {
		this.buttonAction.emit();
	}
}
