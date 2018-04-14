import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { User } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { Profile } from '../shared/models/profile.model';
import { Niveles as EnumNiveles } from '../shared/enums/niveles.enum';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: Profile;
  niveles = EnumNiveles;
  constructor(private auth: AngularFireAuth, private router: Router, private db: AngularFirestore,
    private userService: UserService) { }

  ngOnInit() {
    let currentUser = this.auth.auth.currentUser;
    this.userService.getProfile();
    this.userService.$profile.subscribe((profile) => this.profile = profile);
    // this.agregarReto();
  }

  logOut() {
    this.auth.auth.signOut()
      .then(() => this.router.navigateByUrl("login"));
  }

  agregarReto() {
    let round = `{"activo":true,"descripcion":{"nombre":"#CONOCIMIENTO - ALIMENTACION","contenido":"TEMPLOS<br><br>CUIDAR nuestros CUERPOS es más que un acto de VANIDAD. ¿Estas cuidando tu cuerpo? ¿Sabías que las cinco causas más comunes de muerte están relacionadas con la alimentación?<br><br>1 Corintios 6:19 ¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros, el cual tenéis de Dios, y que no sois vuestros?","numero":2},"retos":[{"nombre":"Físico","niveles":[{"dias":[{"reto":"Trote suave 30 mins"},{"reto":"Trote suave 30 mins"}],"titulo":"Trote suave 2 veces a la semana por 30min (no solo correr, también podrías andar en bici, caminatas más intensas y constantes, etc)"},{"dias":[{"reto":"Carrera"},{"reto":"Carrera"}],"titulo":"Actividad Física Opcional:<br>Ciclismo, eliptica, entrenamiento de fuerza"},{"dias":[{"reto":"Carrera"},{"reto":"Carrera"},{"reto":"Carrera"}],"titulo":"Corre 3 veces a la semana de 6 a 8 kms.<br>Actividad física opcional:<br>no solo correr, también podría ser andar en bici, caminatas más intensas y constantes, etc"}],"extra":"<small class='text-muted'>Por Gustavo A. González Amador y Alix Osorio Castillo</small>"},{"nombre":"Espiritual","niveles":[{"titulo":"Lee por lo menos UN capítulo al día","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Lee por lo menos DOS capítulos al día","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Lee por lo menos TRES capítulos al día","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}]},{"nombre":"Alimentos","niveles":[{"titulo":"Comer en cada alimento proteína grasa y carbos.<br>Evitar jugos, harinas.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Comer en cada alimento proteína grasa y carbós.<br>Evitar jugos, harinas<br>Tomar de 2.5 a 3 lts de agua sin azúcar.<br>Aumentar la ingesta de verduras verdes ","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Comer en cada alimento proteína grasa y carbos<br>Evitar jugos, harinas<br>Tomar de 2.5 a 3 lts de agua sin azúcar<br>Aumentar la ingesta de verduras verdes<br>Aumentar la ingesta de proteína<br>Tomar multivitaminico con antioxidantes.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}],"extra":"<small class='text-muted'>Por Gustavo A. González Amador y Alix Osorio Castillo</small>"},{"nombre":"Personal","niveles":[{"titulo":"TEMPLOS<br>Efesios 5:29 (RVC): Nadie ha odiado jamás a su propio cuerpo, sino que lo sustenta y lo cuida, como lo hace Cristo con la iglesia.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"TEMPLOS<br>Efesios 5:29 (RVC): Nadie ha odiado jamás a su propio cuerpo, sino que lo sustenta y lo cuida, como lo hace Cristo con la iglesia.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"TEMPLOS<br>Efesios 5:29 (RVC): Nadie ha odiado jamás a su propio cuerpo, sino que lo sustenta y lo cuida, como lo hace Cristo con la iglesia.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}]}]}`
    let body = JSON.parse(round);
    this.db.doc(`rounds/2`).set(body);
  }

}
