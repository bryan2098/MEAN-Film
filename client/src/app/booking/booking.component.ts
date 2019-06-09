import { Component, OnInit } from '@angular/core';
import { Booking, User } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private store: Store<Booking>, private adminService: AdminService, private storeUser: Store<User>) { }
  bookings: Booking[];
  user: User;
  ngOnInit() {
    this.storeUser.select('userInfo').subscribe(u => {
      this.user = u;
    });
    
    this.list();
    this.store.select('adminBookingReducer')
      .subscribe(l => {
        this.bookings = l;
      })

  }

  //  danh sach
  list() {
    this.adminService.listBooking()
      .then(list => {
        this.store.dispatch({ type: 'INIT', bookings: list })
      })
      .catch(err => console.error(err));
  }

  // xoa
  DeleteBooking(_id: string) {
    this.adminService.deleteBooking(_id)
      .then(() => {
        this.list();
      })
      .catch(err => err)
  }
}
