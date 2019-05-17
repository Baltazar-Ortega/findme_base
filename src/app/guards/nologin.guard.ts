import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate  {
  constructor(private AFauth: AngularFireAuth, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.AFauth.authState.pipe(map(auth => {
// tslint:disable-next-line: deprecation
      if (isNullOrUndefined(auth)) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }));
}

}
