import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { UserService } from '../app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserScoreGuard implements CanActivate {

  constructor(private userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const username = route.params['username'];

    return this.userService.getUserDetails(username).pipe(
      map(user => user && user.score >= 30.0),
      catchError(() => of(false))
    );
  }
}
