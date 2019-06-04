import { Component, OnInit } from '@angular/core';
import { Theater } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {
  formAddTheater: FormGroup;
  theaters: Theater[];
  message: String;

  formUpdateTheater: FormGroup;

  constructor(private store: Store<Theater>, private adminService: AdminService, private fb: FormBuilder) {
    this.formAddTheater = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    })

    this.formUpdateTheater = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

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


  // them rap
  AddTheater() {
    const { name, address } = this.formAddTheater.value;
    this.adminService.addTheaters(name, address)
      .then((res: any) => {
        this.message = res.code;
        this.formAddTheater.setValue({ name: '', address: '' });
        this.list();
      })
      .catch(err => err)
  }


  // cap nhat
  UpdateTheater(_id: string) {
    const { name, address } = this.formUpdateTheater.value;
    this.adminService.updateTheater(name, address, _id)
      .then((res: any) => {
        this.message = res.code;        
        this.list();
        location.reload();
      })
      .catch(err => err)
  }


  // xoa
  DeleteTheater(_id: string) {
    this.adminService.deleteTheater(_id)
      .then(() => {
        this.list();
      })
      .catch(err => err)
  }
}
