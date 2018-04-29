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
    let round = `{"activo":true,"descripcion":{"nombre":"#COMPROMISO","contenido":"Seremos probados, vendrán obstáculos para cumplir los sueños, anhelos y metas.<br><br>Gran parte de la solución es la actitud con la que enfrentas tus retos. Tu confianza en Dios, afirma tu fe, y te permite sonreír confiando en Dios para seguir adelante hasta la meta.","numero":4},"retos":[{"nombre":"Físico","niveles":[{"dias":[{"reto":"Trote y enfriamiento"},{"reto":"Trote y enfriamiento"},{"reto":"Trote y enfriamiento"}],"titulo":"<ul><li>Trote suave 3 veces a la semana por 45 min</li><li>Enfriamiento de caminata de 20 min</li></ul>"},{"dias":[{"reto":""},{"reto":""},{"reto":""},{"reto":""}],"titulo":"<ul><li>Trote 4 veces por semana</li><li>2 sesiones de distancia</li><li>2 sesiones de velocidad (Distancia corta)</li><li>Fortalecimiento de abdomen y core (crunch, planchas, extensiones de cadera y elevaciones de piernas)</li></ul>"},{"dias":[{"reto":""},{"reto":""},{"reto":""},{"reto":""},{"reto":""},{"reto":""}],"titulo":"<ul><li>Trote de 3 a 4 veces por semana (2 sesiones de distancias largas de 6 a 8k y 2 sesiones de distancias cortas con mayor velocidad)</li><li>Los otros dos días: fortalecimiento de piernas (sentadillas, desplantes. Peso muerto) y CORE (crunch, planchas, extensiones de cadera y elevaciones de piernas)</li></ul>"}],"extra":"<small class='text-muted'>Por Gustavo A. González Amador y Alix Osorio Castillo</small>"},{"nombre":"Espiritual","niveles":[{"titulo":"Lee 1 capítulo diario","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Lee 2 capítulos diarios","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Lee 3 capítulos diarios","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}]},{"nombre":"Alimentos","niveles":[{"titulo":"<ul><li>Evitar jugos, harinas y embutidos </li><li>Tomar de 2 a 2.5 lts de agua sin azúcar </li><li>Aumentar la ingesta de verduras verdes</li><li>Comer en cada alimento proteína grasa (semillas) y carbos </li><li>(Inmediatamente después de entrenar aumentar la ingesta de proteína  y carbohidratos NO GRASAS)</li><li>Tomar multi-vitamínico con antioxidantes.tipo Biometrix o Pharmaton solo si sabes si no eres alérgico.</li></ul>","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"<ul><li>Al terminar tu entrenamiento tienes hasta 25 minutos para consumir tus alimentos.</li><li>Principalmente después de entrenar ingiere proteínas y carbohidratos NO grasas.</li><li>Recomendación consume frutos rojos.</li><li>Agua sin azúcar 2.5 a 3 lts</li><li>Evita harinas, embutidos, jugos y lácteos </li></ul>","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"<ul><li>Al terminar tu entrenamiento tienes hasta 25 minutos para consumir tus alimentos.proteínas y carbohidratos NO grasas.</li><li>Trata de que tus alimentos sean medidos conservando de un 100%, en 60% carbohidratos, el 30% proteínas y 10% grasas</li><li>Recomendación consume frutos rojos.</li><li>Agua sin azúcar 2.5 a 3 lts</li><li>Evita harinas, embutidos, jugos y lácteos </li><li>Electrolitos 2 veces a la semana</li></ul>","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}],"extra":"<small class='text-muted'>Por Gustavo A. González Amador y Alix Osorio Castillo</small>"},{"nombre":"Personal","niveles":[{"titulo":"SONRÍE<br><br>Jeremías 17:8 Porque será como el árbol plantado junto a las aguas, que junto a la corriente echará sus raíces, y no verá cuando viene el calor, sino que su hoja estará verde; y en el año de sequía no se fatigará, ni dejará de dar fruto.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"SONRÍE<br><br>Jeremías 17:8 Porque será como el árbol plantado junto a las aguas, que junto a la corriente echará sus raíces, y no verá cuando viene el calor, sino que su hoja estará verde; y en el año de sequía no se fatigará, ni dejará de dar fruto.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"SONRÍE<br><br>Jeremías 17:8 Porque será como el árbol plantado junto a las aguas, que junto a la corriente echará sus raíces, y no verá cuando viene el calor, sino que su hoja estará verde; y en el año de sequía no se fatigará, ni dejará de dar fruto.","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}]}]}`;
    let body = JSON.parse(round);
    this.db.doc(`rounds/4`).set(body);
  }

}
