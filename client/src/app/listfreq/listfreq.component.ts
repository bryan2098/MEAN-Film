import { Component, OnInit, ɵConsole } from '@angular/core';
import {Frequency } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';
import { UserService } from '../service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-listfreq',
  templateUrl: './listfreq.component.html',
  styleUrls: ['./listfreq.component.css']
})
export class ListfreqComponent implements OnInit {
  frequencies: Frequency[];
  BookingForm: FormGroup;
  constructor(private store: Store<Frequency>, private adminService: AdminService,  private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.BookingForm = this.fb.group({
      dateFilm: ['', Validators.required]
    })
   }

  ngOnInit() {
    this.listFrequency();
    this.store.select('adminFrequencyReducer')
    .subscribe(l => {
      this.frequencies = l;
    })
  
  }

  // danh sach suat chieu
  listFrequency()
  {
    this.adminService.listFrequency()
      .then(list => {
        this.store.dispatch({ type: 'INIT', frequencies: list })
        // console.log(this.frequencies);
      })
      .catch(err => console.error(err));
  }

  //them cho
  AddBooking(idFrequency: string)
  {
    const {dateFilm} = this.BookingForm.value;
    this.userService.addBooking(idFrequency, dateFilm)
    .then(res => {
      this.router.navigateByUrl("/choosechair");
      // reload ben trang choosechair
      setTimeout(() => {
        location.reload();
      }, 200);
    })
    .catch(err => {
      this.router.navigateByUrl("/");
      console.error(err)
    });
  }

}
