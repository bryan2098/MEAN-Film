import { Component, OnInit } from '@angular/core';
import { Ticket } from '../type';
import { Store } from '@ngrx/store';
import { UserService } from '../service/user.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-choose-chair',
  templateUrl: './choose-chair.component.html',
  styleUrls: ['./choose-chair.component.css']
})
export class ChooseChairComponent implements OnInit {
  formAddTicket: FormGroup;
  bookingid = localStorage.getItem('bookingid');
  
  seatCode = [];
  constructor(private store: Store<Ticket>, private userService: UserService, private fb: FormBuilder) { 
    this.counter(10, 75);
    this.formAddTicket = this.fb.group({
      seatCode: new FormArray([])
    })
    this.addCheckBox();
  }
  ngOnInit() {
    // console.log(this.seatCode);
  }




  // vi tri ghe
  counter(a: number, b: number) 
  {
    let arrSeatCode = new Array;
    for(let j = 65; j <= b; j++)
      for(let i = 1; i <= a; i++)
        arrSeatCode.push(i + String.fromCharCode(j));

    this.seatCode = arrSeatCode;
    return arrSeatCode;
  }



  private addCheckBox()
  {
    this.seatCode.map((seatCode, index) => {
      const control = new FormControl(index === 0);
      (this.formAddTicket.controls.seatCode as FormArray).push(control);
    })
  }


  // dat ve
  AddTicket()
  {
    console.log(this.formAddTicket.value);
  }

}
