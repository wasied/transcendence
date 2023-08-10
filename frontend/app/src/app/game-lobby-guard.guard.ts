import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessControlService } from './core/services/access-control.service';

@Injectable({
  providedIn: 'root'
})
export class GameLobbyGuard implements CanActivate {
  constructor(private accessControlService: AccessControlService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accessControlService.getAccess()) {
      return true;
    } else {
      return this.router.parseUrl('/main/game_params');
    }
  }
}
