import { Component, OnInit } from '@angular/core';
import { Cinema, Movie, Frequency, User } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-frequecies',
  templateUrl: './frequecies.component.html',
  styleUrls: ['./frequecies.component.css']
})
export class FrequeciesComponent implements OnInit {

  cinemas: Cinema[];
  movies: Movie[];
  frequencies: Frequency[];
  formAddFreq: FormGroup;
  message: string;
  user: User;
  constructor(private store: Store<Cinema>, private adminService: AdminService, private fb: FormBuilder,  private storeUser: Store<User>) { 
    this.storeUser.select('userInfo').subscribe(u =>{
      this.user = u;
    });
    this.formAddFreq = this.fb.group({
      idCinema: ['', Validators.required],
      idFilm: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeFinish: ['', Validators.required],
      ticketPrice: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.listCinema();
    this.store.select('adminFrequencyReducer')
    .subscribe(l => {
      this.frequencies = l;
    })
    this.listMovie();
    this.listFrequency();
  }


  // danh  sach phim
  listMovie()
  {
    this.adminService.listMovie()
      .then(list => {
        this.movies = list;
      })
      .catch(err => console.error(err));
  }

  // danh sach rap
  listCinema()
  {
    this.adminService.listCinema()
      .then(list => {
       this.cinemas = list;
      })
      .catch(err => console.error(err));
  }


  // danh sach suat chieu
  listFrequency()
  {
    this.adminService.listFrequency()
      .then(list => {
        this.store.dispatch({ type: 'INIT', frequencies: list })
      })
      .catch(err => console.error(err));
  }



  // them suat chieu
  AddFreq()
  {
    const {idCinema, idFilm, timeStart, timeFinish, ticketPrice} = this.formAddFreq.value;
    this.adminService.addFrequency(idCinema, idFilm, timeStart, timeFinish, ticketPrice)
    .then((res: any) => {
      this.message = res.code;
      this.formAddFreq.setValue({ idCinema: '', idFilm: '', timeStart: '', timeFinish: '', ticketPrice: '' });
      this.listFrequency();
    })
  }

  // xoa suat chieu
  DeleteFreq(_id: string)
  {
    this.adminService.deleteFrequency(_id)
    .then((res: any) => {
      this.listFrequency();
    })
  }
}
