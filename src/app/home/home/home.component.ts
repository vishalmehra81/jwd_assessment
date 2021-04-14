import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IconsProviderModule } from './../../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  

  imports: [
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    BrowserAnimationsModule,

  ]

  constructor(private ref: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      if(this.user){
        this.router.navigate(['']);
      }else{
        this.router.navigate(['login']);
      }
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

}
