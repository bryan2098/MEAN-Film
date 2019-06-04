import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Injectable()
export class MustBeGuestGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (localStorage.getItem('token')) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}