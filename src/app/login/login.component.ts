import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

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

  constructor(private fb: FormBuilder, private loginService: LoginService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    // call the api and validate the user and route to /home
    this.loginService.users$.subscribe(users => {
      let validUser = users.filter(user => user.login == username && user.password == password)[0];
      if (validUser) {
        this.snackBar.open("Login Successfull");
        this.router.navigate(['/home']);
      } else {
        this.snackBar.open("Invalid User");
      }
    });
  }
}
