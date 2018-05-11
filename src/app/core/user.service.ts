import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../shared/models/profile.model';
import { ReplaySubject } from 'rxjs/Rx';
import { Niveles } from '../shared/enums/niveles.enum';

@Injectable()
export class UserService {
  $profile = new ReplaySubject<Profile>(0);
  profile: Profile;
  private levelColors = {
    [Niveles.AVANZADO]: "dark",
    [Niveles.MEDIO]: "primary",
    [Niveles.PRINCIPIANTE]: "success"
  }
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }

  getProfile() {
    let profileRef = this.db.collection<Profile>("profile", ref => ref.where("usuario", "==", this.auth.auth.currentUser.uid).limit(1)).valueChanges();
    profileRef.subscribe((profiles) => this.setProfile(profiles[0]));
  }

  private setProfile(profile: Profile) {
    profile.backgroundColor = "bg-" + this.levelColors[profile.nivel];
    profile.textColor = "text-" + this.levelColors[profile.nivel];
    this.$profile.next(profile);
    this.profile = profile;
  }

}
