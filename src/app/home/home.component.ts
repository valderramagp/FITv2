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
    let round = `{"activo":true,"descripcion":{"nombre":"#FUERZA","contenido":"Josué 14:10-11 “…y ahora, he aquí, hoy soy de edad de ochenta y cinco años… Todavía estoy tan fuerte como el día que Moisés me envió; cual era mi fuerza entonces, tal es ahora mi fuerza…”<br><br>¿Como están tus fuerzas?<br><br>Caleb y Josué, fueron fuertes de jóvenes y en la 3a edad, pero su fortaleza interior ¡los mantuvo fuertes siempre!","numero":3},"retos":[{"nombre":"Físico","niveles":[{"dias":[{"reto":"Trote y enfriamiento"},{"reto":"Trote y enfriamiento"}],"titulo":"<ul><li>Trote suave 2 veces a la semana por 45 mins.</li><li>Enfriamiento de caminata de 20 mins.</li></ul>"},{"dias":[{"reto":""},{"reto":""},{"reto":""}],"titulo":"<ul><li>Trote 3 veces por semana aumentando tu velocidad pero con la misma distancia.</li><li>Fortalecimiento de abdomen y core. Puedes hacer crunch, planchas, extensiones de cadera y elevaciones de piernas.</li></ul>"},{"dias":[{"reto":"Trote 6 a 8 kms"},{"reto":"Trote 6 a 8 kms"},{"reto":"Distancia corta con mayor velocidad"},{"reto":"Distancia corta con mayor velocidad"},{"reto":"Fortalecimiento de piernas"},{"reto":"Fortalecimiento de core"}],"titulo":"<ul><li>Trote de 3 a 4 veces por semana:<br>— 2 sesiones de distancias largas de 6 a 8k.<br>— 2 sesiones de distancias cortas con mayor velocidad.</li><li>Los otros dos dias:<br>— Fortalecimiento de piernas:<br>Puede ser con sentadillas y/o desplantes.<br>— Fortalecimiento de core:<br>Puede ser crunch, planchas, extensiones de cadera y elevaciones de piernas.</li></ul>"}],"extra":"<small class='text-muted'>Por Gustavo A. González Amador y Alix Osorio Castillo</small>"},{"nombre":"Espiritual","niveles":[{"titulo":"Lee 1 capítulo diario","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Lee 2 capítulos diarios","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Lee 3 capítulos diarios","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}]},{"nombre":"Alimentos","niveles":[{"titulo":"<ul><li>Comer en cada alimento proteína grasa (semillas) y carbohidratos.</li><li>Evitar jugos, harinas y embutidos.</li><li>Tomar de 2 a 2.5 lts de agua sin azúcar.</li><li>Aumentar la ingesta de verduras verdes.</li></ul>","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"<ul><li>Comer en cada alimento proteína grasa (semillas) y carbohidratos.</li><li>Evitar jugos, harinas y embutidos.</li><li>Tomar de 2.5 a 3 lts de agua sin azúcar.</li><li>Aumentar la ingesta de verduras verdes.</li><li>Aumentar la ingesta de proteína  y carbohidratos inmediatamente después de entrenar.</li><li>Tomar multi-vitamínico con antioxidantes (Biometrix o Pharmaton) sólo si sabes si no eres alérgico.</li></ul>","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"<ul><li>Al terminar tu entrenamiento tienes hasta 25 minutos para consumir tus alimentos.</li><li>Principalmente después de entrenar ingiere proteínas y carbohidratos, NO grasas.</li><li>Recomendación: Consume frutos rojos.</li><li>Agua sin azúcar 2.5 a 3 lts.</li><li>Evita harinas, embutidos, jugos y lácteos.</li></ul>","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}],"extra":"<small class='text-muted'>Por Gustavo A. González Amador y Alix Osorio Castillo</small>"},{"nombre":"Personal","niveles":[{"titulo":"Ten el cuidado de saludar a todos con la atención, <strong>abraza</strong> y pasa por alto la ofensa.<br><br>Génesis 33:4 “Pero Esaú corrió a su encuentro y le abrazó, y se echó sobre su cuello, y le besó; y lloraron.”","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Ten el cuidado de saludar a todos con la atención, <strong>abraza</strong> y pasa por alto la ofensa.<br><br>Génesis 33:4 “Pero Esaú corrió a su encuentro y le abrazó, y se echó sobre su cuello, y le besó; y lloraron.”","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]},{"titulo":"Ten el cuidado de saludar a todos con la atención, <strong>abraza</strong> y pasa por alto la ofensa.<br><br>Génesis 33:4 “Pero Esaú corrió a su encuentro y le abrazó, y se echó sobre su cuello, y le besó; y lloraron.”","dias":[{"reto":"Lunes"},{"reto":"Martes"},{"reto":"Miércoles"},{"reto":"Jueves"},{"reto":"Viernes"},{"reto":"Sábado"}]}]}]}`
    let body = JSON.parse(round);
    this.db.doc(`rounds/3`).set(body);
  }

}
