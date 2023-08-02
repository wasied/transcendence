import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-white-page',
  templateUrl: './white-page.component.html',
  styleUrls: ['./white-page.component.css']
})
export class WhitePageComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthenticationService
	) {};

	ngOnInit(): void {
		const accessToken = this.route.snapshot.queryParamMap.get('access_token');
		if (!accessToken || accessToken === "")
			return ; // handling err there
		this.authService.storeTokenOnLocalSession(accessToken);
		this.router.navigateByUrl('/main');
	}
}
