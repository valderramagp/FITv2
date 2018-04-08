import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private session: AngularFireAuth, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
                resolve(this.checkIfUser());
            }, 700);
        })
    }

    checkIfUser(): Promise<boolean> {
        if (this.session.auth.currentUser) return Promise.resolve(true);
        else {
            this.router.navigateByUrl("login");
            return Promise.resolve(false);
        }
    }
}