import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'modal-content',
	templateUrl: './registro.component.html',
	styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
	formSubmitted: boolean;
	form: FormGroup;

	constructor(public modal: BsModalRef, private fBuilder: FormBuilder,
		private auth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

	ngOnInit() {
		this.buildForm();
	}

	buildForm() {
		this.form = this.fBuilder.group({
			nombre: [null, Validators.required],
			apellido: [null, Validators.required],
			correo: [null, Validators.required],
			password: [null, Validators.required],
			edad: [null, Validators.required],
			genero: [null, Validators.required],
			nivel: ['', Validators.required]
		});
	}

	validarFormulario() {
		this.formSubmitted = true
		if (this.form.valid) this.registrarUsuario();
	}

	registrarUsuario() {
		this.auth.auth.createUserWithEmailAndPassword(this.form.controls.correo.value, this.form.controls.password.value)
			.then(() => this.handleSuccess())
			.catch(error => this.handleError(error));
	}

	handleSuccess() {
		this.db.collection("profile").add({
			nombre: this.form.controls.nombre.value,
			apellido: this.form.controls.apellido.value,
			edad: this.form.controls.edad.value,
			genero: this.form.controls.genero.value,
			nivel: this.form.controls.nivel.value,
			usuario: this.auth.auth.currentUser.uid
		}).then(() => this.auth.auth.currentUser.sendEmailVerification());
		this.modal.hide();
		this.router.navigateByUrl("");
	}

	handleError(error) {
		if (error.code == "auth/email-already-in-use") {
			this.form.controls.correo.setErrors({ existing: true });
		} else if (error.code == "auth/invalid-email") {
      		this.form.controls.correo.setErrors({ invalidEmail: true });
    	} else {
			throw error;
		}
	}

}
