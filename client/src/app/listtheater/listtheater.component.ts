import { Component, OnInit } from '@angular/core';
import { Theater } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-listtheater',
  templateUrl: './listtheater.component.html',
  styleUrls: ['./listtheater.component.css']
})
export class ListtheaterComponent implements OnInit {

  constructor(private store: Store<Theater>, private adminService: AdminService,) { }
  theaters: Theater[];
  ngOnInit() {
    this.list();
    this.store.select('adminTheaterReducer')
      .subscribe(l => {
        this.theaters = l;
      })
  }
 //  danh sach
 list() {
  this.adminService.listTheater()
    .then(list => {
      this.store.dispatch({ type: 'INIT', theaters: list })
    })
    .catch(err => console.error(err));
}



}
