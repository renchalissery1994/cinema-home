import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user$ = this.appService.user$;

  constructor(private appService: AppService, private router: Router) {
    // Reset the application cache when the page reloads
    let user = JSON.parse(sessionStorage.getItem("user")); // Convert user JSON from string to object
    if (user) this.appService.setLoggedInUser(user); // Set the user in the application cache
  }

  logout() {
    this.appService.logout();
    this.router.navigate(['login']);
  }
}
