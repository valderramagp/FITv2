import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/auth-guard.service';
import { LoginGuard } from './core/login-guard.service';

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "rounds",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }