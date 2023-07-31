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
	serverResponse$!: Observable<{status :string}>;

	constructor (private formBuilder: FormBuilder, 
				 private auth: AuthenticationService,
				 private router: Router) {}

	ngOnInit(): void {
		this.authForm = this.formBuilder.group({
			code: ['']
		});
	}

	onSubmit() : void {
		const authData = this.authForm.value;

      	this.serverResponse$ = this.auth.sendAuthData(authData).pipe(
			tap({
				next: response => {
					console.log(response);
					if (response.status === 'ok') { // adjust this based on actual response structure
						console.log('should trigger redir with success');
						//this.router.navigate(['/main']);
					}
				},
				error: error => console.log(error)
			})
		);
	}
}
