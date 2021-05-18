import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppService } from './app.service';
import { User } from './models/user';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private appService: AppService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Check the session storage for logged in user
        let userString = sessionStorage.getItem("user");
        if (userString) {
            // let user = JSON.parse(sessionStorage.getItem("user")); // Convert user JSON from string to object
            // this.appService.setLoggedInUser(user); // Set the user in the application cache
            return true;
        }
        this.router.navigate(['login']); // Navigate to login page if the user is not logged in
        return false;
    }

}
