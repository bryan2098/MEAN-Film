import { Component, OnInit } from '@angular/core';
import { Ticket } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  tickets: Ticket[];
  constructor(private store: Store<Ticket>, private adminService: AdminService) { }

  ngOnInit() {
    this.list();
    this.store.select('adminTicketReducer')
      .subscribe(l => {
        this.tickets = l;
      })
  }


   //  danh sach
   list() {
    this.adminService.listTicket()
      .then(list => {
        this.store.dispatch({ type: 'INIT', tickets: list })
      })
      .catch(err => console.error(err));
  }


}
