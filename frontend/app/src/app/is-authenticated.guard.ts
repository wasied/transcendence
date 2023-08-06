import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../app/core/services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class isAuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().then((isAuthenticated) => {
    if (isAuthenticated) {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  });
}
}
