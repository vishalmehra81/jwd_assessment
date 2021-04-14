import { Injectable, ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  currentUser: CognitoUserInterface | undefined;
  authState: AuthState;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private ref: ChangeDetectorRef) { }

  isAuthenticatedUser() : boolean {
    return this.currentUser ? true : false;
  }

  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.currentUser = authData as CognitoUserInterface;
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
