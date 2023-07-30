import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import axios, { setAuthToken } from '../../../axios';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-white-page',
  templateUrl: './white-page.component.html',
  styleUrls: ['./white-page.component.css']
})
export class WhitePageComponent {
	constructor(
		private http: HttpClient,
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
