import { Component, OnInit } from '@angular/core';
import { Movie } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-listfilm',
  templateUrl: './listfilm.component.html',
  styleUrls: ['./listfilm.component.css']
})
export class ListfilmComponent implements OnInit {
  movies: Movie[];
  constructor(private store: Store<Movie>, private adminService: AdminService) { }

  ngOnInit() {
    this.list();
    this.store.select('adminMovieReducer')
        .subscribe(l => {
          this.movies = l;
        })
  }
  
  // danh sach phim
  list()
  {
    this.adminService.listMovie()
    .then(list => {
      this.store.dispatch({ type: 'INIT', movies: list })
    })
    .catch(err => console.error(err));
  }

}
