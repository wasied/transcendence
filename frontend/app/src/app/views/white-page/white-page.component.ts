import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-white-page',
  templateUrl: './white-page.component.html'
})
export class WhitePageComponent {
	
	private access_token!: string | null;
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthenticationService
	) {};

	ngOnInit(): void {
		this.access_token = this.route.snapshot.queryParamMap.get('access_token');
		if (!this.access_token|| this.access_token === '')
			return ; // handle error there
		this.authService.storeAuthToken42(this.access_token);
		this.router.navigateByUrl('/main');
	}
}
