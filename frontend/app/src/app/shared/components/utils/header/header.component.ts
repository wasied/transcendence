import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model'; 
import { UsersService } from 'src/app/core/services/users.service';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	user$!: Observable<User>;
	isMenuOpen = false;

	private hardodedUser: User = {
		id: 1,
		username: 'styx',
		status: 'online',
		profile_picture_url: 'not',
		a2f_key: 'lol',
		created_at: '',
		updated_at: '',
	}
  
	constructor (private usersService: UsersService,
    			 private router: Router) {}

  	ngOnInit(): void {
		this.getUserData();
  	}

	getUserData() : void {
		//this.user$ = this.usersService.getMe();
		this.user$ = of(this.hardodedUser); // suppress that when non necessary

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
		this.router.navigate(['main', 'game_params']);
  	}

	toggleMenu(): void {
		this.isMenuOpen = !this.isMenuOpen;
		if (this.isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}
}
