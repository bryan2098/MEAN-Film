import { Component, OnInit } from '@angular/core';
import { Movie, User } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  formAddMovie: FormGroup;
  ChangePoster: FormGroup;
  movies: Movie[];
  avt: File;
  message: string;
  user: User;
  constructor( private store: Store<Movie>, private adminService: AdminService, private fb: FormBuilder, private storeUser: Store<User>) {
    this.storeUser.select('userInfo').subscribe(u =>{
      this.user = u;
    });
    
    this.formAddMovie = this.fb.group({
      name: ['', Validators.required],
      movieTime: [0, Validators.required],
      content: ['', Validators.required],
      premiereDate: ['', Validators.required]
    });

    this.ChangePoster = this.fb.group({
      images: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.list();
    this.store.select('adminMovieReducer')
        .subscribe(l => {
          this.movies = l;
        })
  }

  list()
  {
    this.adminService.listMovie()
    .then(list => {
      this.store.dispatch({ type: 'INIT', movies: list })
    })
    .catch(err => console.error(err));
  }


  

  AddMovie()
  {
    const { name, premiereDate, content, movieTime } = this.formAddMovie.value;
    this.adminService.addMovie(name, premiereDate, content, movieTime)
    .then((res: any) => {
      setTimeout(() => {
        location.reload();
      }, 200)
    })
    .catch(err => err)
    this.list();
  }


  DeleteMovie(_id: string)
  {
    this.adminService.deleteMovie(_id)
      .then(() => {
        this.list();
      })
      .catch(err => err)
  }

  selectFile(fileInfo) {
    this.avt = fileInfo.target.files[0];
  }


  changePoster(_id: string)
  {
    const formData = new FormData();
    formData.append('images', this.avt, this.avt.name);
    this.adminService.changePoster(_id, formData);
    
    setTimeout(() => {
      location.reload();
    }, 500)
  }
}
