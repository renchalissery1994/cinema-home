import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';

@Injectable({
    providedIn: 'root',
})
export class AppService {

    private userBehaviorSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    user$ = this.userBehaviorSubject.asObservable()

    constructor() { }

    // Set the logged in user
    setLoggedInUser(user: User) {
        this.userBehaviorSubject.next(user);
    }
}