import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { RoundsModule } from './rounds/rounds.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    RoundsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
