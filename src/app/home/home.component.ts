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
    let round = `{"activo":true,"descripcion":{"nombre":"Iniciativa","contenido":"La iniciativa es una de las cualidades más valoradas en la actualidad por las empresas y los profesionales de recursos humanos. Permite a las personas diferenciarse y destacar sobre otras a la hora de afrontar un proceso de selección laboral.<br><br> Iniciativa: el ingrediente clave para dar lo mejor de ti. Filipenses 3:13-14<br><br> Hermanos, yo mismo no pretendo haberlo ya alcanzado; pero una cosa hago: olvidando ciertamente lo que queda atrás, y extendiéndome a lo que está delante, prosigo a la meta, al premio del supremo llamamiento de Dios en Cristo Jesús.","numero":1},"retos":[{"nombre":"Físico","niveles":[{"dias":[{"reto":"Trote suave 30 mins"},{"reto":"Trote suave 30 mins"}]},{"dias":[{"reto":"Corre min. 30 mins"},{"reto":"Corre min. 40 mins"},{"reto":"Corre min. 30 mins"}],"titulo":"Actividad Física Opcional<br>bici, eliptica, entrenamiento de fuerza"},{"dias":[{"reto":"5K"},{"reto":"6K"},{"reto":"5K"},{"reto":"6K"},{"reto":"5K"}],"titulo":"Actividad Física Opcional<br>Entrenamiento de fuerza y resistencia"}],"extra":"<small class='text-muted'>Por Gustavo A. González Amador y Alix Osorio Castillo</small>"},{"nombre":"Espiritual","niveles":[{"titulo":"Lee por lo menos UN capítulo a la semana","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Lee por lo menos DOS capítulos a la semana","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Lee por lo menos TRES capítulos a la semana","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}]},{"nombre":"Alimentos","niveles":[{"titulo":"Evita ingerir fritos y empanizados.<br> Toma agua sin azúcar o fruta (no jugos).","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"1) Come cada 4 hrs.<br>2) Evita azúcar, lácteos, fritos y empanados.<br>3) Consume ácidos grasos omega (semillas, salmón etc).<br>4) Toma 2 lt de agua.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"1) Después de entrenar ingiere tus alimentos.<br>2) Consume proteínas, carbohidratos (arroz, avena, tortilla) y lípidos NO HARINAS.<br>3) Evita azúcar, lácteos, fritos y empanados.<br>4) Consume ácidos grasos omega (semillas, salmón etc).<br>5)Toma 2 lt de agua","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}],"extra":"<small class='text-muted'>Por Gustavo A. González Amador y Alix Osorio Castillo</small>"},{"nombre":"Personal","niveles":[{"titulo":"CERO CRITICA<br>Mateo 9:4 Y conociendo Jesús los pensamientos de ellos, dijo: ¿Por qué pensáis mal en vuestros corazones?<br><br>Proverbios 6:12 El hombre malo, el hombre depravado, Es el que anda en perversidad de boca;","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"CERO CRITICA<br>Mateo 9:4 Y conociendo Jesús los pensamientos de ellos, dijo: ¿Por qué pensáis mal en vuestros corazones?<br><br>Proverbios 6:12 El hombre malo, el hombre depravado, Es el que anda en perversidad de boca;","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"CERO CRITICA<br>Mateo 9:4 Y conociendo Jesús los pensamientos de ellos, dijo: ¿Por qué pensáis mal en vuestros corazones?<br><br>Proverbios 6:12 El hombre malo, el hombre depravado, Es el que anda en perversidad de boca;","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}]}]}`
    let body = JSON.parse(round);
    this.db.doc(`rounds/${1}`).set(body);
  }

}
