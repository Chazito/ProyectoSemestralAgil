import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const expectedRoles: number[] = route.data['roles'];

    const user = this.userService.getUser();

    if (!user) {
      return of(this.router.createUrlTree(['/login']));
    }

    const tienePermiso = expectedRoles.includes(user.rol);
    return of(tienePermiso ? true : this.router.createUrlTree(['/acceso-denegado']));
  }
}
