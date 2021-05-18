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

    private moviesBehaviorSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>(null);
    movies$ = this.moviesBehaviorSubject.asObservable()

    private cenemasBehaviorSubject: BehaviorSubject<Cinema[]> = new BehaviorSubject<Cinema[]>(null);
    cenemas$ = this.cenemasBehaviorSubject.asObservable()

    constructor(private http: HttpClient) { }

    // Get all users
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(environment.apiUrl + '/users');
    }
    // Get all cinemas
    getCinemas(){
        return this.http.get<Cinema[]>(environment.apiUrl + '/cinemas').subscribe(cinemas=>this.cenemasBehaviorSubject.next(cinemas));
    }
    // Get all movies
    getMovies() {
        this.http.get<Movie[]>(environment.apiUrl + '/movies').subscribe(movies=>this.moviesBehaviorSubject.next(movies));
    }

    // Set the logged in user
    setLoggedInUser(user: User) {
        this.userBehaviorSubject.next(user);
        sessionStorage.setItem('user', JSON.stringify({ ...user, password: undefined })); // Store the user in session storage without password
    }

    updateUser(user: User) {
        this.userBehaviorSubject.next(user);
    }

    updateMovies(movies: Movie[]) {
        this.moviesBehaviorSubject.next(movies);
    }

    logout() {
        sessionStorage.clear(); // Clear user from session storage
        this.userBehaviorSubject.next(null); // Clear user from application cache
    }
}