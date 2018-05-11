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
    let round = `{"activo":true,"descripcion":{"nombre":"#PERSEVERANCIA","contenido":"No es tanto la fuerza como el tiempo. resistir firmes y constantes.","numero":5},"retos":[{"nombre":"Físico","niveles":[{"dias":[{"reto":""},{"reto":""},{"reto":""},{"reto":"#CarreraFITv2"}],"titulo":"<ul><li>Trote suave 3 veces a la semana por 45 min + 2 veces a la semana de fortalecimiento de CORE (crunch, planchas frontales y laterales y elevaciones de piernas)</li><li>Enfriamiento de caminata de 20 min</li><li>OJO, el VIERNES DESCANSA de actividad física y duerme TEMPRANO para  la #CARRERAFITv2</li><li>Consume carbohidratos durante el día de preferencias pastas, sin quesos ni grasas</li></ul>"},{"dias":[{"reto":""},{"reto":""},{"reto":""},{"reto":""},{"reto":"#CarreraFITv2"}],"titulo":"<ul><li>Trote de 3 a 4 veces por semana: 2 sesiones de distancias largas (hasta 4k) y 2 sesiones de distancias cortas con mayor velocidad.</li><li>Los otros dos días Fortalecimiento de piernas (sentadillas, desplantes. Peso muerto ) y CORE (crunch, planchas, frontales y laterales y elevaciones de piernas)</li><li>OJO, el VIERNES DESCANSA de actividad física y duerme TEMPRANO para  la #CARRERAFITv2</li><li>Consume carbohidratos durante el día de preferencias pastas, sin quesos ni grasas</li></ul>"},{"dias":[{"reto":""},{"reto":""},{"reto":""},{"reto":""},{"reto":"#CarreraFITv2"}],"titulo":"<ul><li>2 sesiones de distancia larga (de 6 a 8K)</li><li>2 sesiones cortas de velocidad (de 4 a 6K con pendientes)</li><li>Un día de trabajo de técnica de carrera. enfócate en tu brazada, pisada, en la apertura de tu compás, en tu respiración y en tu frecuencia cardiaca.</li><li>OJO, el VIERNES DESCANSA de actividad física y duerme TEMPRANO para  la #CARRERAFITv2</li><li>Consume carbohidratos durante el día de preferencias pastas, sin quesos ni grasas</li></ul>"}],"extra":"<small class='text-muted'>Por Gustavo A. González Amador y Alix Osorio Castillo</small>"},{"nombre":"Espiritual","niveles":[{"titulo":"Lee 1 capítulo diario","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Lee 2 capítulos diarios","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Lee 3 capítulos diarios","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}]},{"nombre":"Alimentos","niveles":[{"titulo":"<ul><li>Evitar jugos, harinas, fritos, capeados, embutidos y lácteos </li><li>Aumentar la ingesta de verduras verdes</li><li>Comer en cada alimento proteína grasa (semillas) y carbos </li><li>Tomar 2 a 2.5 agua sin azúcar</li><li>Tomar ELECTROLITOS ó recomendación UN vaso 250 ml, pista de sal del Himalaya, medio limón.</li><li>Inmediatamente después de entrenar aumentar la ingesta de proteína  y carbohidratos NO GRASAS</li><li>Tomar multivitaminico con antioxidantes.tipo Biometrix o Pharmaton solo si sabes si no eres alérgico.</li></ul>","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"<ul><li>Al terminar tu entrenamiento tienes hasta 25 minutos para consumir tus alimentos.</li><li>Principalmente después de entrenar ingiere proteínas y carbohidratos NO grasas.</li><li>Recomendación consume frutos rojos.</li><li>Agua sin azúcar 2.5 a 3 lts</li><li>Tomar ELECTROLITOS ó recomendación UN vaso 250 ml, pista de sal del Himalaya, medio limón.</li><li>Evita harinas, embutidos, capeados y fritos, aderezos, jugos y lácteos </li></ul>","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"<ul><li>Al terminar tu entrenamiento tienes hasta 25 minutos para consumir tus alimentos.proteínas y carbohidratos NO grasas.</li><li>Trata de q tus alimentos sean medidos conservando de un 100%, un 60% carbohidratos, el 30% proteinas y 10% grasas</li><li>Recomendación consume frutos rojos.</li><li>Agua sin azúcar 2.5 a 3 lts</li><li>Tomar ELECTROLITOS ó recomendación UN vaso 250 ml, pista de sal del Himalaya, medio limón.</li><li>Evita harinas, embutidos, capeados y fritos, aderezos, jugos y lácteos </li></ul>","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}],"extra":"<small class='text-muted'>Por Gustavo A. González Amador y Alix Osorio Castillo</small>"},{"nombre":"Personal","niveles":[{"titulo":"Llegar a dormir y poder AGRADECER que nuevamente llegamos al final del día<br><br>Lucas 18:1 También les refirió Jesús una parábola sobre la necesidad de orar siempre, y no desmayar,<br><br>Este es nuestro ultimo ROUND antes de la carrera, recuerda que es un COMPROMISO eterno, ora, lee, entrena, y repite.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Llegar a dormir y poder AGRADECER que nuevamente llegamos al final del día<br><br>Lucas 18:1 También les refirió Jesús una parábola sobre la necesidad de orar siempre, y no desmayar,<br><br>Este es nuestro ultimo ROUND antes de la carrera, recuerda que es un COMPROMISO eterno, ora, lee, entrena, y repite.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Llegar a dormir y poder AGRADECER que nuevamente llegamos al final del día<br><br>Lucas 18:1 También les refirió Jesús una parábola sobre la necesidad de orar siempre, y no desmayar,<br><br>Este es nuestro ultimo ROUND antes de la carrera, recuerda que es un COMPROMISO eterno, ora, lee, entrena, y repite. ","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}]}]}`;
    let body = JSON.parse(round);
    this.db.doc(`rounds/5`).set(body);
  }

}
