import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cinema } from './models/cinema';
import { Movie } from './models/movie';
import { User } from './models/user';

@Injectable({
    providedIn: 'root',
})
export class AppService {

    private userBehaviorSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    user$ = this.userBehaviorSubject.asObservable()

    constructor(private http: HttpClient) { }

    // Get all users
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + '/users');
    }
    // Get all cinemas
    getCinemas(): Observable<Cinema[]> {
        return this.http.get<Cinema[]>(environment.apiUrl + '/cinemas');
    }
    // Get all movies
    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(environment.apiUrl + '/movies');
    }

    // Set the logged in user
    setLoggedInUser(user: User) {
        this.userBehaviorSubject.next(user);
    }
}