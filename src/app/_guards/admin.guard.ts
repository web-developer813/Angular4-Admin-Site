import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        let currentUser = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
        currentUser = JSON.parse(currentUser);
        if (currentUser && currentUser['admin'] === 'Yes') {
            return true;
        } else {
            return false;
        }
    }
}
