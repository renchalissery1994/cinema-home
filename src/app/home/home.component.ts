import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../app.service';
import { Cinema } from '../models/cinema';
import { Movie } from '../models/movie';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cinema: Cinema;
  user: User;

  moviesLiked$ = combineLatest([this.appService.user$, this.appService.getCinemas(), this.appService.getMovies()]).pipe(
    map(([user, cinemas, movies]) => {
      this.user = user;
      this.cinema = cinemas.filter(cinema => cinema.id == user.cinema)[0];
      return movies.filter(movie => user.movies_liked.filter(likedMovies => likedMovies == movie.id).length > 0);
    })
  );

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  unlikeMovie(movie: Movie) {
    this.user.movies_liked = this.user.movies_liked.filter(movieId => movieId != movie.id)
    this.appService.setLoggedInUser(this.user);
  }
}
