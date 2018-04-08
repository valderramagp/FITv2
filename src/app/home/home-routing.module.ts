import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoundsComponent } from './rounds/rounds.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/auth-guard.service';

const homeRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "rounds",
        component: RoundsComponent
      }
    ],
    canActivate: [AuthGuard]
  }
];

export const HomeRoutingModule = RouterModule.forChild(homeRoutes);