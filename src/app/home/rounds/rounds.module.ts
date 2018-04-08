import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundsComponent } from './rounds.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [RoundsComponent]
})
export class RoundsModule { }
