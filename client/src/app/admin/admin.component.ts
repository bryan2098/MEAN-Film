import { Component, OnInit } from '@angular/core';
import { User } from '../type';
import { Store } from '@ngrx/store';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User;
  token: String = localStorage.getItem('token');
  constructor(private store: Store<User>) {
    this.store.select('userInfo').subscribe(u =>{
      this.user = u;
    });
   }

  ngOnInit() {
  }

}
