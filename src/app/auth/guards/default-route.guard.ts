import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class DefaultRouteGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<UrlTree> {
    return this.auth.check().pipe(
      map((authenticated) =>
        this.router.createUrlTree([authenticated ? '/dashboard' : '/home'])
      )
    );
  }
}
