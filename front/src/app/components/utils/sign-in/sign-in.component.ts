import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;

  constructor (private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {};
  
  ngOnInit(): void {
    // trigger form
    this.signInForm = this.formBuilder.group ({
      username: [null],
      password: [null]
    })
  }

  onSubmitForm() : void {
    
    const username: string = this.signInForm.get('username')?.value;
    let id: number | undefined;

    // retrieve id corresponding to username
    if (username)
      id = this.userService.getIdByUser(username);
    else
      throw console.error('non existing username');
    // change url
    if (id)
      this.router.navigateByUrl(`/main/${id}`);
    else
      throw console.error('non existing id');
  }
}
