import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../app.service';
import { Cinema } from '../models/cinema';
import { Movie } from '../models/movie';
import { User } from '../models/user';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  cinema: Cinema;
  user: User;

  movies$ = combineLatest([this.appService.user$, this.appService.getCinemas(), this.appService.getMovies()]).pipe(
    map(([user, cinemas, movies]) => {
      if (!user) return [];
      this.user = user;
      this.cinema = cinemas.filter(cinema => cinema.id == user.cinema)[0];
      return movies;
    })
  );

  constructor(private appService: AppService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  likeMovie(movie: Movie) {
    // Check if the movies is already been liked by the user
    if (this.user.movies_liked.filter(movieId => movieId == movie.id).length == 0) {
      this.user.movies_liked.push(movie.id);
      this.appService.updateUserDetails(this.user);
    } else {
      let snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.snackBar.open("Movie already liked", "Close");
      setTimeout(() => this.snackBar.dismiss(), 1000); // Close snack bar after 1 seconds
      snackBarRef.onAction().subscribe(() => this.snackBar.dismiss()); // Snack Bar action on close
    }
  }
}
