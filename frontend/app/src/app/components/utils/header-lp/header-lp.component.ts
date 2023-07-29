import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-lp',
  templateUrl: './header-lp.component.html',
  styleUrls: ['./header-lp.component.css']
})
export class HeaderLpComponent implements OnInit {
  
  constructor(private router: Router, private authService: AuthService) {};
  
  ngOnInit(): void {}

  onAddNewUser() : void {
    this.router.navigateByUrl('/signup');
  }

  onSignIn() : void {
    this.authService.triggerAuth();
    this.router.navigateByUrl('/signin');
  }
}
