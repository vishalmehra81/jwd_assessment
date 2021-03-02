import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { IconsProviderModule } from './../icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
 import { NzSelectModule } from 'ng-zorro-antd/select';
 import { NzPaginationModule } from 'ng-zorro-antd/pagination';
 import { NzAlertModule } from 'ng-zorro-antd/alert';
 import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';


@NgModule({
  declarations: [UsersComponent, EmployeesComponent, HomeComponent],
  exports: [
    UsersComponent,
    EmployeesComponent,
    HomeComponent
    

  ],
  imports: [
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzRadioModule,
    NzSelectModule,
    NzTableModule,
    NzFormModule,
    NzButtonModule,
    HttpClientModule,
    NzPaginationModule,
    NzAlertModule,
    AmplifyUIAngularModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeModule { }
