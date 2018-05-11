import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private user: UserService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return new Promise<boolean>((resolve, reject) => {
            setTimeout(() => {
                resolve(this.checkIfUser());
            }, 700);
        })
    }

    checkIfUser(): Promise<boolean> {
        if (this.user.profile.admin) return Promise.resolve(true);
        else {
            return Promise.resolve(false);
        }
    }
}