import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router, private appService: AppService) { }

  ngOnInit(): void {
  }

  // Authenticate user
  login() {
    if (this.loginForm.invalid) return;
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;

    // Validate user
    this.appService.getUsers().subscribe(users => {
      let validUser = users.filter(user => user.login == username && user.password == password)[0]; // Get the user with matching username and passwrodd
      let snackBarRef: MatSnackBarRef<TextOnlySnackBar> = null;
      if (validUser) {
        snackBarRef = this.snackBar.open("Login Successfull", "Close");
        this.appService.setLoggedInUser(validUser); // Set the logged in user
        this.router.navigate(['/home']);
      } else {
        snackBarRef = this.snackBar.open("Invalid User", "Close");
      }
      setTimeout(()=>this.snackBar.dismiss(), 2000); // Close snack bar after 2 seconds
      snackBarRef.onAction().subscribe(() => this.snackBar.dismiss()); // Snack Bar action on close
    });
  }
}
