import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { httpErrorHandler } from 'src/app/http-error-handler';

@Component({
	selector: 'app-double-auth',
	templateUrl: './double-auth.component.html'
})
export class DoubleAuthComponent implements OnInit {
	
	authForm!: FormGroup;
	serverResponse$!: Observable<{ success: boolean, url: string }>;
	userId!: number;

	constructor (
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private authenticationService: AuthenticationService,
		private router: Router
	) {}

	ngOnInit(): void {
		const userId = this.route.snapshot.queryParamMap.get('user_id');
		if (!userId || userId === "") {
			console.error("User not found");
			return ;
		}
		this.userId = +userId;

		this.authForm = this.formBuilder.group({
			code: ['']
		});
	}

	onSubmit() : void {
		const code = this.authForm.controls['code'].value;

		this.serverResponse$ = this.authenticationService.handle2fa(this.userId, code).pipe(
			tap({
				next: response => {
					console.log(response);
					if (response.success) {
						console.log('should trigger redir with success');
						this.router.navigateByUrl(response.url);
					}
					else {
					}
				},
				error: httpErrorHandler
			})
		);
	}
}
