import { Component, OnInit } from '@angular/core';
import { User } from '../type';
import { Store } from '@ngrx/store';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  token: String = localStorage.getItem('token');

  constructor(private store: Store<User>, private userService: UserService) {
    this.store.select('userInfo').subscribe(u =>{
      this.user = u;
    });
   }

  ngOnInit() {
  }

  Logout() {
    
    this.userService.logOut();
      location.reload();
  }

}
