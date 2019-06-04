import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class SignupGuard implements CanActivate {
    constructor(private router: Router) {
    }
    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (!localStorage.getItem('token')) { // true
            return true;
        } else {
            // chuyen ve trang chu
            this.router.navigateByUrl('/');
            return false; // false
        }
    }
}