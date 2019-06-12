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
  bookingid = localStorage.getItem('bookingid');
  
  constructor(private store: Store<Ticket>, private userService: UserService, private fb: FormBuilder) {   
    this.formAddTicket = this.fb.group({
      seatCode: new FormArray([]),
    })
    
  }
  ngOnInit() {
    // console.log(this.seatCode);
  }


  get seat(): FormArray { return this.formAddTicket.get('seatCode') as FormArray; }



  // so luong ghe
  counter(a: number, b: number) 
  {
    let arrSeatCode = new Array;
    for(let j = 65; j <= b; j++)
      for(let i = 1; i <= a; i++)
        arrSeatCode.push(i + String.fromCharCode(j));
    return arrSeatCode;
  }



  // dat ve
  AddTicket()
  {
    console.log(this.formAddTicket.value);
  }

}
