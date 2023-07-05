import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  signInForm!: FormGroup;

  constructor (private formBuilder: FormBuilder,
               private router: Router,
               private userService: UserService) {};
  
  ngOnInit(): void {
    // trigger form
    this.signInForm = this.formBuilder.group ({
      username: [null],
      password: [null]
    })
  }

  ngOnDestroy(): void {
    
  }

  onSubmitForm() : void {
    const username: string = this.signInForm.get('username')?.value;
    userHasSignedIn$: Observable<User>; 

    // retrieve id corresponding to username
    if (!username)
      throw console.error('non existing username');
    console.log(username); // debug
    this.userService.getUserByUsername(username);
    this.userService.storeUserId();
    this.router.navigateByUrl('/main');
  }
}
