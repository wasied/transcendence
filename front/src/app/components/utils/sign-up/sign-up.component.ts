import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  signUpVals$!: Observable<User>; // for preview
  
  constructor (private formBuilder: FormBuilder,
               private userService: UserService,
               private router: Router) {};
  
  ngOnInit(): void {
    // trigger form
    this.signUpForm = this.formBuilder.group({
      username: [null],
      password: [null],
      imageUrl: [null],
      phoneNumber: [null]
    });

    // observable op
    this.signUpVals$ = this.signUpForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
      }))
    )
  }

  // should be temporary to store values in an array, updating the array
  onSubmitForm() : void {
  
    // add user to service
    const id: number = this.userService.addUser(this.signUpForm);
    // check that it worked (debug)
    this.userService.displayUsers();
    // triggers new component
    this.router.navigateByUrl(`/main/${id}`); // change that
  };
}
