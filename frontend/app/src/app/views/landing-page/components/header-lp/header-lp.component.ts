import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-lp',
  templateUrl: './header-lp.component.html',
  styleUrls: ['./header-lp.component.css']
})
export class HeaderLpComponent implements OnInit {
  
	constructor(private router: Router) {};
  
	ngOnInit(): void {}

	onAddNewUser() : void { // do not use this one for now
		this.router.navigateByUrl('/signup');
	}

	onSignIn() : void {
		// this.router.navigateByUrl('/signin'); use is after
		//this.router.navigateByUrl('/main');

		window.location.href = '`${process.env.AUTH_42_OAUTH_URL}/authorize?client_id=${process.env.AUTH_42_CLIENT_KEY}&redirect_uri=${AUTH_42_RETURN_URI}&response_type=codeˋ';
	}
}
