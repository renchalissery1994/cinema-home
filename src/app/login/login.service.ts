import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    users$ = this.http.get<User[]>(environment.apiUrl + '/users');

    constructor(private http: HttpClient) { }

}