import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { BsModalService } from 'ngx-bootstrap';
import { RegistroComponent } from '../shared/components/registro/registro.component';
import { LoaderService } from '../core/loader.service';
import { PasswordResetComponent } from '../shared/components/password-reset/password-reset.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formSubmitted: boolean;
  form: FormGroup;
  constructor(private fBuilder: FormBuilder, private auth: AngularFireAuth,
    private router: Router, private bsModalService: BsModalService,
    private loader: LoaderService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fBuilder.group({
      correo: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    this.formSubmitted = true;
    if (this.form.invalid) return;
    this.loader.start();
    this.auth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.auth.auth.signInWithEmailAndPassword(this.form.controls.correo.value, this.form.controls.password.value)
      .then(() => this.router.navigateByUrl(""))
      .catch(error => this.handleBadLogin(error));
  }

  handleBadLogin(error) {
    this.loader.stop();
    if (error.code == "auth/wrong-password") {
      this.form.controls.password.setErrors({ wrongPassword: true });
    } else if (error.code == "auth/invalid-email") {
      this.form.controls.correo.setErrors({ invalidEmail: true });
    } else if (error.code == "auth/user-not-found") {
      this.form.controls.correo.setErrors({ userNotFound: true });
    }
    else {
      throw error;
    }
  }

  register() {
    this.bsModalService.show(RegistroComponent, { class: "modal-lg" });
  }
  
  restorePassword() {
    this.bsModalService.show(PasswordResetComponent);
  }
}
