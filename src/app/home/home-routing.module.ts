import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RoundsComponent } from './rounds/rounds.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../core/auth-guard.service';
import { AdminGuard } from '../core/admin-guard.service';

const homeRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "rounds",
        component: RoundsComponent
      },
      {
        path: "admin",
        component: AdminComponent,
        canActivate: [AdminGuard]
      }
    ],
    canActivate: [AuthGuard]
  }
];

export const HomeRoutingModule = RouterModule.forChild(homeRoutes);