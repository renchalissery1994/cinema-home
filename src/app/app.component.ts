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

  constructor(private appService: AppService, private router: Router) { }

  logout() {
    this.appService.logout();
    this.router.navigate(['login']);
  }
}
