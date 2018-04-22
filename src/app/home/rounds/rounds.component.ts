import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Round } from '../../shared/models/round.model';
import { Profile } from '../../shared/models/profile.model';
import { UserService } from '../../core/user.service';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { Progress } from '../../shared/models/progress.model';
import { LoaderService } from '../../core/loader.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector: 'app-rounds',
	templateUrl: './rounds.component.html',
	styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit {
	profile: Profile;
	roundActivo: Round;
	rounds: any[6] = new Array(6);
	constructor(private db: AngularFirestore, private userService: UserService,
		private fBuilder: FormBuilder, private loader: LoaderService, private authService: AngularFireAuth) { }

	ngOnInit() {
		this.loader.start();
		this.userService.$profile.subscribe(profile => {
			this.profile = profile;
			this.getRounds();
		});
	}

	getRounds() {
		let activeRound = this.calculateActiveRound();
		if (activeRound >= 1 && activeRound <= 6) {
			this.db.doc<Round>(`rounds/${activeRound}`).valueChanges().subscribe(t => this.mergeRounds(t));
		} else {
			this.db.collection<Round>("rounds", ref => ref.where('activo', '==', true)).valueChanges().subscribe(t => this.mergeRounds(t[0]));
		}
	}

	calculateActiveRound(): number {
		try {
			let creationTime = Date.parse(this.authService.auth.currentUser.metadata.creationTime) - (1000 * 3600 * 4);
			
			let divideFlag = new Date(2018, 3, 22);
			if (creationTime < divideFlag.getTime()) return 0;

			let fitStartDate = new Date(2018, 3, 8);
			var userCreationDate = creationTime > fitStartDate.getTime() ? new Date(creationTime) : fitStartDate;
			userCreationDate.setHours(0, 0, 0);
			var currentDate = new Date();
			currentDate.setHours(0, 0, 0);
			let timeDiff = Math.abs(currentDate.getTime() - userCreationDate.getTime());
			var daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
			let activeRound = Math.ceil((daysDiff + userCreationDate.getDay()) / 7);
			return activeRound == 0 ? 1 : activeRound;
		} catch (error) {
			return 0;
		}
	}

	mergeRounds(round: Round) {
		round.retos.forEach(reto => {
			reto.form = this.buildForm(reto.nombre, reto.niveles[this.profile.nivel].dias);
			reto.form.valueChanges.distinctUntilChanged().debounceTime(2000).subscribe((value) => this.guardarReto(reto.nombre, value));
			let suscription = this.db.doc(`progress/${this.profile.usuario}/rounds/${round.descripcion.numero}/challenges/${reto.nombre}`).valueChanges().subscribe(value => { if (value) { reto.form.patchValue(value, { emitEvent: false }); } suscription.unsubscribe(); });
		});
		this.roundActivo = round;
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
