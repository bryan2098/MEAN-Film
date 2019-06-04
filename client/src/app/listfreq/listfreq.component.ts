import { Component, OnInit, ɵConsole } from '@angular/core';
import {Frequency } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';


@Component({
  selector: 'app-listfreq',
  templateUrl: './listfreq.component.html',
  styleUrls: ['./listfreq.component.css']
})
export class ListfreqComponent implements OnInit {
  frequencies: Frequency[];
  constructor(private store: Store<Frequency>, private adminService: AdminService) { }

  ngOnInit() {
    this.listFrequency();
    this.store.select('adminFrequencyReducer')
    .subscribe(l => {
      this.frequencies = l;
    })
  
  }

  listFrequency()
  {
    this.adminService.listFrequency()
      .then(list => {
        this.store.dispatch({ type: 'INIT', frequencies: list })
        console.log(this.frequencies);
      })
      .catch(err => console.error(err));
  }
}
