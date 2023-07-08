import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;

  constructor (private formBuilder: FormBuilder,
               private router: Router,
               private usersService: UsersService) {};
  
  ngOnInit(): void {
    // trigger form
    this.signInForm = this.formBuilder.group ({
      username: [null],
      password: [null]
    })
  }

  onSubmitForm() : void {
    const username: string = this.signInForm.get('username')?.value;

    // retrieve id corresponding to username
    if (!username)
      throw console.error('non existing username');
    console.log(username); // debug
    this.usersService.getUserByUsername(username);
    this.usersService.storeUserId();
    this.router.navigateByUrl('/main');
  }
}
