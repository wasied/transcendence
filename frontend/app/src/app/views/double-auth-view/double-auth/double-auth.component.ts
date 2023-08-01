import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-double-auth',
	templateUrl: './double-auth.component.html'
})
export class DoubleAuthComponent implements OnInit {
	
	authForm!: FormGroup;
	serverResponse$!: Observable<{ success: boolean, url: string }>;

	constructor (private formBuilder: FormBuilder, 
				 private authenticationService: AuthenticationService,
				 private router: Router) {}

	ngOnInit(): void {
		this.authForm = this.formBuilder.group({
			code: ['']
		});
	}

	onSubmit() : void {
		const authData = this.authForm.value;

		this.serverResponse$ = this.authenticationService.handle2fa(authData).pipe(
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
				error: error => console.log(error)
			})
		);
	}
}
