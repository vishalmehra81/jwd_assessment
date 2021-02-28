import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IconsProviderModule } from './../../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  constructor() { }


  imports: [
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    BrowserAnimationsModule,

  ]

  ngOnInit(): void {
  }

}
