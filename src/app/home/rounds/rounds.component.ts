import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Round } from '../../shared/models/round.model';
import { Profile } from '../../shared/models/profile.model';
import { UserService } from '../../core/user.service';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { Progress } from '../../shared/models/progress.model';
import { LoaderService } from '../../core/loader.service';

@Component({
	selector: 'app-rounds',
	templateUrl: './rounds.component.html',
	styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit {
	profile: Profile;
	roundActivo: Round;
	constructor(private db: AngularFirestore, private userService: UserService,
		private fBuilder: FormBuilder, private loader: LoaderService) { }

	ngOnInit() {
		this.loader.start();
		this.userService.$profile.subscribe(profile => {
			this.profile = profile;
			this.getRounds();
		});
	}

	getRounds() {
		this.db.collection<Round>("rounds").valueChanges().subscribe(t => this.mergeRounds(t));
	}

	mergeRounds(rounds: Array<Round>) {
		this.roundActivo = rounds.find(t => t.activo);
		this.roundActivo.retos.forEach(reto => {
			reto.form = this.buildForm(reto.nombre, reto.niveles[this.profile.nivel].dias);
			reto.form.valueChanges.distinctUntilChanged().debounceTime(5000).subscribe((value) => this.guardarReto(reto.nombre, value));
			let suscription = this.db.doc(`progress/${this.profile.usuario}/rounds/${this.roundActivo.descripcion.numero}/challenges/${reto.nombre}`).valueChanges().subscribe(value => { if (value) { reto.form.patchValue(value, { emitEvent: false }); } suscription.unsubscribe(); });
		});
		this.loader.stop();
	}

	buildForm(reto: string, dias: any[]) {
		let group: any = {};
		dias.forEach((value, index) => {
			let formControl = new FormControl();
			group[index] = formControl;
		});
		return new FormGroup(group);
	}

	guardarReto(reto: string, value: any) {
		let round = this.roundActivo.descripcion.numero;
		let progress = this.db.doc(`progress/${this.profile.usuario}/rounds/${round}/challenges/${reto}`);
		progress.set(value);
	}

}
