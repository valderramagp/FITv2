import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BsModalService } from 'ngx-bootstrap';
import { DetalleUsuarioComponent } from '../../shared/components/detalle-usuario/detalle-usuario.component';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
	users: Array<any>;
	totalRounds = 5;
	totalChallenges = 4;
	toggleNombre: boolean;
	toggleApellido: boolean;
	toggleNivel: boolean;
	toggleEdad: boolean;
	toggleProgress: boolean;
	
	constructor(private db: AngularFirestore, private bsModalService: BsModalService) { }

	ngOnInit() {
		this.db.collection("profile").valueChanges().map(users => this.setUpUsers(users)).subscribe(users => this.users = users);
	}

	downloadResults() {
		this.users.forEach(user => {
			for (let round = 0; round < this.totalRounds; round++) {
				let suscription = this.db.collection(`progress/${user.usuario}/rounds/${round}/challenges`).valueChanges().subscribe(progress => {
					suscription.unsubscribe();

					if (!progress || progress.length == 0) return;
					user.rounds[round].progress = progress;

					var percentages = progress.map((challenge, index) => {
						let asserts = 0;
						for (var day in challenge) {
							if (challenge[day]) asserts++;
						}
						let challengeProgress = (asserts / Object.keys(challenge).length);
						user.rounds[round].challenges[index] = challengeProgress;
						return challengeProgress;
					});

					var percent = percentages.reduce((prev, curr) => {
						return prev + curr;
					});

					var totalProgress = percent / this.totalChallenges;
					user.rounds[round].totalProgress = totalProgress;

					user.totalProgress = 0;
					for (let r in user.rounds) {
						user.totalProgress += user.rounds[r].totalProgress;
					}
					user.totalProgressInPercent = (user.totalProgress / (this.totalRounds));
				});
			}
		});
	}

	setUpUsers(users: any) {
		return users.map(user => {
			user.progress = {};
			user.nivel = Number(user.nivel) + 1;
			user.rounds = {};
			for (let round = 0; round < this.totalRounds; round++) {
				user.rounds[round] = {};
				user.rounds[round].challenges = {};
				user.rounds[round].totalProgress = 0;
			}
			return user;
		});
	}

	verDesglose(user) {
		var modal = this.bsModalService.show(DetalleUsuarioComponent, { class: "modal-lg" });
		modal.content.user = user;
	}

	orderByColumn(column: string, ascending: boolean) {
		let ordered = this.users.sort(this.compareFunction(column, ascending));
	}

	private compareFunction(key: string, ascending: boolean) {
		return (a, b) => {
			if (!a.hasOwnProperty(key)) return ascending ? 1 : -1;
			if (!b.hasOwnProperty(key)) return ascending ? -1 : 1;

			const varA = (typeof a[key] === 'string') ?
				a[key].toUpperCase() : a[key];
			const varB = (typeof b[key] === 'string') ?
				b[key].toUpperCase() : b[key];

			let comparison = 0;
			if (varA > varB) {
				comparison = 1;
			} else if (varA < varB) {
				comparison = -1;
			}
			return (
				(ascending) ? (comparison * -1) : comparison
			);
		}
	}

}
