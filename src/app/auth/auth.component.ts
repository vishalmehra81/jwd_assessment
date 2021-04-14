import { Component, OnInit } from '@angular/core';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';

/* Configure Amplify resources */
Amplify.configure(awsconfig);

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isCollapsed = false;
  constructor() { }

  ngOnInit(): void {
  }

}
