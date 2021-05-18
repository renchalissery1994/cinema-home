import { Component, OnInit } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from '../app.service';
import { Movie } from '../models/movie';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  moviesLiked$ = combineLatest([this.appService.user$, this.appService.movies$]).pipe(
    map(([user, movies]) => {
      if (!user || !movies) return [];
      this.user = user;
      return movies.filter(movie => user.movies_liked.filter(likedMovies => likedMovies == movie.id).length > 0);
    })
  );

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  unlikeMovie(movie: Movie) {
    this.user.movies_liked = this.user.movies_liked.filter(movieId => movieId != movie.id)
    this.appService.updateUser(this.user);
  }
}
