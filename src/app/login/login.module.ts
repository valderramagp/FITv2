import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RegistroComponent } from '../shared/components/registro/registro.component';
import { RegistroModule } from '../shared/components/registro/registro.module';
import { PasswordResetComponent } from '../shared/components/password-reset/password-reset.component';
import { PasswordResetModule } from '../shared/components/password-reset/password-reset.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistroModule,
    PasswordResetModule
  ],
  declarations: [LoginComponent],
  entryComponents: [
    RegistroComponent,
    PasswordResetComponent
  ]
})
export class LoginModule { }
