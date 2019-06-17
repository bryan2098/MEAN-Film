import { Component, OnInit } from '@angular/core';
import { Ticket } from '../type';
import { Store } from '@ngrx/store';
import { UserService } from '../service/user.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, FormControlName } from '@angular/forms';
@Component({
  selector: 'app-choose-chair',
  templateUrl: './choose-chair.component.html',
  styleUrls: ['./choose-chair.component.css']
})
export class ChooseChairComponent implements OnInit {
  formAddTicket: FormGroup;
  seatCode: FormArray;
  bookingid = localStorage.getItem('bookingid');

  constructor(private store: Store<Ticket>, private userService: UserService, private fb: FormBuilder) {
    this.formAddTicket = this.fb.group({
      seatCode: this.fb.array(this.addItem())
    });
  }
  ngOnInit() {}

  createItem(i: string): FormGroup {
    return this.fb.group({
      seat: [i]
    });
  }
  
  addItem() {
    const ss = [];
    this.counter().forEach((s, i) => {
      ss[i] =  this.createItem(s);
    });
    return ss;
  }

  // so luong ghe
  counter(a: number = 10, b: number= 75) {
    const arrSeatCode = [];
    for (let j = 65; j < b; j++) {
      for (let i = 1; i <= a; i++) {
        arrSeatCode.push(i + String.fromCharCode(j));
      }
    }
    return arrSeatCode;
  }

  // dat ve
  AddTicket() {
    console.log(this.formAddTicket.value.seatCode);
  }

}