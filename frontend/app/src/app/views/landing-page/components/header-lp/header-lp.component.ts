import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header-lp',
  templateUrl: './header-lp.component.html',
  styleUrls: ['./header-lp.component.css']
})
export class HeaderLpComponent {
  
	constructor(private router: Router,
				private authService: AuthenticationService) {};
  
	onSignIn() : void {
		this.authService.triggerAuth();
	}
}
