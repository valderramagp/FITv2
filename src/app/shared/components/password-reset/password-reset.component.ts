import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoaderService } from '../../../core/loader.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  formSubmitted: boolean;
  form: FormGroup;
  constructor(public modal: BsModalRef, private fBuilder: FormBuilder, private auth: AngularFireAuth,
    private loader: LoaderService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fBuilder.group({
      correo: [null, Validators.required]
    })
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.form.invalid) return;
    this.loader.start();
    this.auth.auth.sendPasswordResetEmail(this.form.controls.correo.value)
      .then(result => this.onSuccess())
      .catch(error => this.onError(error)); 
  }

  onSuccess() {
    this.modal.hide();
    this.loader.stop();
  }

  onError(error) {
    this.loader.stop();
    if (error.code == "auth/invalid-email") {
      this.form.controls.correo.setErrors({ invalidEmail: true });
    } else if (error.code == "auth/user-not-found") {
      this.form.controls.correo.setErrors({ userNotFound: true });
    } else {
      throw error;
    }
  }

}
