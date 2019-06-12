import { Component, OnInit } from '@angular/core';
import { Ticket, User} from '../type';
import { Store } from '@ngrx/store';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  tickets: Ticket[];
  user: User;

  constructor(private store: Store<Ticket>, private userService: UserService, private storeUser: Store<User>) { 
    this.storeUser.select('userInfo').subscribe(u =>{
      this.user = u;
    });
    this.list();
    this.store.select('adminTicketReducer')
      .subscribe(l => {
        this.tickets = l.data;
      })
  }

  ngOnInit() {}


  list() {
    this.userService.listUserTicket(this.user._id)
      .then(list => {
        this.store.dispatch({ type: 'INIT', tickets: list })
      })
      .catch(err => console.error(err));
  }

}
