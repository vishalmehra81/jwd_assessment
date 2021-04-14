import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { UsersComponent } from './home/users/users.component';
import { EmployeesComponent } from './home/employees/employees.component';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  //{path: '', component: HomeComponent},
  //{path: 'home', component: HomeComponent},
  {path: 'home/users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'home/employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent},
  //{path: '**', component: UsersComponent},

  // { path: '', pathMatch: 'full', redirectTo: '/home' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  // { path: 'user', loadChildren: () => import('./home/home.module').then(m => m.UsersModule) },

  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
