import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-profile-self',
	templateUrl: './profile-self.component.html',
	styleUrls: ['./profile-self.component.css']
})
export class ProfileSelfComponent {
	userID = 1; // Temporary
	user_stats : any = {};

	constructor (private http: HttpClient) {}
	private apiURL : string = 'http://localhost:3000/stats';

	ngOnInit(): void {
		this.getStats();
	}

	getStats(): void {
		this.http.get<any>(this.apiURL).subscribe(stats => {
			this.user_stats = stats[this.userID];
		});
	}
}
