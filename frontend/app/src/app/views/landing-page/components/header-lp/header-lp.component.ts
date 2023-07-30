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
		this.router.navigateByUrl('/main');
	}
}
