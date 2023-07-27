import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model'; 
import { UsersService } from 'src/app/core/services/users.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	// user$!: Observable<User>;
	private currentId!: number;
	user$!: Observable<User>;
  
	constructor (private usersService: UsersService,
    			 private route: ActivatedRoute,
    			 private router: Router) {}

  	ngOnInit(): void {
		this.getUserData();
  	}

	getUserData() : void {
    	// this.currentId = this.usersService.getUserId();
    	// this.user$ = this.usersService.getUserById(this.currentId);
		this.user$ = this.usersService.retrieveHardcodedUser(); // change this agter optimization
  	}

  	onClickOnChatrooms() : void {
		this.router.navigate(['main', 'chatrooms']);
  	}

  	onClickOnMessages() : void {
		this.router.navigate(['main', 'direct_messages']);
  	}

	onClickOnFriends() : void {
		this.router.navigate(['main', 'friends']);
  	}

  	onClickOnProfilePicture() : void {
    	this.router.navigate(['main', 'profile']);
  	}

	onClickPlay() : void {
		console.log('not implemented yet');
  	}
}
