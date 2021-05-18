import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    constructor(private http: HttpClient) { }

    // Get all users
    getUsers() {
        return this.http.get<User[]>(environment.apiUrl + '/users');
    }

}