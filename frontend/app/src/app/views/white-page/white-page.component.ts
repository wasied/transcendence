import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { setAuthToken } from '../../axios';

@Component({
  selector: 'app-white-page',
  templateUrl: './white-page.component.html',
  styleUrls: ['./white-page.component.css']
})
export class WhitePageComponent {
	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {};

	async ngOnInit(): Promise<void> {
		const accessToken = this.route.snapshot.queryParamMap.get('access_token');
		if (!accessToken || accessToken === "")
			return ;
		setAuthToken(accessToken);
		this.router.navigateByUrl('/main');
	}
}
