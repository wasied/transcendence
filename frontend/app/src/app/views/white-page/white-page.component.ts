import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { GlobalWebsocketService } from 'src/app/core/services/global-websocket.service';

@Component({
  selector: 'app-white-page',
  templateUrl: './white-page.component.html'
})
export class WhitePageComponent implements OnInit {

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthenticationService,
		private globalWebsocketService: GlobalWebsocketService
	) {};

	ngOnInit(): void {
		const accessToken = this.route.snapshot.queryParamMap.get('access_token');
		if (!accessToken || accessToken === "") {
			this.router.navigateByUrl('/');
			return ;
		}
		this.authService.storeTokenOnLocalSession(accessToken);
		this.globalWebsocketService.connect();
		const isNewUserStr = this.route.snapshot.queryParamMap.get('new_user');
		var isNewUser;
		if (!isNewUserStr || isNewUserStr === "")
			isNewUser = false;
		else
			isNewUser = JSON.parse(isNewUserStr);

		if (isNewUser)
			this.router.navigateByUrl('main/profile');
		else
			this.router.navigateByUrl('/main');
	}
}
