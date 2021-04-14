import { Injectable, ChangeDetectorRef } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   currentUser: CognitoUserInterface | undefined;
   authState: AuthState;

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('AuthGuard#canActivate called');
      console.log(state.url);
      return Auth.currentAuthenticatedUser()
      .then(user => {
          if(user){
            return true;
          }
      })
      .catch(() => {
        //return this.router.parseUrl('/login');
        this.router.navigate(['login']);
        return false;
      });
  }
}
