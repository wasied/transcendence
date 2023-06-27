import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-lp',
  templateUrl: './header-lp.component.html',
  styleUrls: ['./header-lp.component.css']
})
export class HeaderLpComponent implements OnInit {
  
  constructor(private router: Router) {};
  
  ngOnInit(): void {}

  onAddNewUser() : void {
    this.router.navigateByUrl('/signup');
  }
}
