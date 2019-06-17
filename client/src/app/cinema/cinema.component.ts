import { Component, OnInit } from '@angular/core';
import { Cinema, Theater, User } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  formAddCinema: FormGroup;
  formUpdateCinema: FormGroup;
  message: String;
  cinemas: Cinema[];
  theaters: Theater[];
  user: User;
  constructor(private store: Store<Cinema>, private adminService: AdminService, private fb: FormBuilder, private storeUser: Store<User>) { 
    this.storeUser.select('userInfo').subscribe(u =>{
      this.user = u;
    });

    this.formAddCinema = this.fb.group({
      name: ['', Validators.required],
      idTheaters: [0, Validators.required],
      theaterType: ['', Validators.required],
      horizontalSize: [0, Validators.required],
      verticalSize: [0, Validators.required]
    });
    this.formUpdateCinema = this.fb.group({
      name: ['', Validators.required],
      idTheaters: [0, Validators.required],
      theaterType: ['', Validators.required],
      horizontalSize: [0, Validators.required],
      verticalSize: [0, Validators.required]
    })
  }

  // danh sach cum rap
  listTheater()
  {
    this.adminService.listTheater()
    .then(list => {
      this.theaters = list;

    })
    .catch(err => console.error(err));
  }
  
  // danh sach rap
  list() {
    this.adminService.listCinema()
      .then(list => {
        this.store.dispatch({ type: 'INIT', cinemas: list })
      })
      .catch(err => console.error(err));
  }


  ngOnInit() {
    this.listTheater();
    this.list();
    this.store.select('adminCinemaReducer')
    .subscribe(l => {
      this.cinemas = l;
    })
  }

  // them rap
  AddCinema()
  {
    const {name, idTheaters, theaterType, horizontalSize, verticalSize} = this.formAddCinema.value;
    this.adminService.addCinema(name, idTheaters, theaterType, horizontalSize, verticalSize)
    .then((res: any) => {
      this.message = res.code;
      this.formAddCinema.setValue({ name: '', idTheaters: 0, theaterType: '', horizontalSize: 0, verticalSize: 0 });
      this.list();
    })
  }

  // xoa rap
  DeleteCinema(_id: string)
  {
    this.adminService.deleteCinema(_id)
      .then(() => {
        this.list();
      })
      .catch(err => err)
  }

  // cap nhat rap
  UpdateCinema(_id: string) {
    const { name, idTheaters, theaterType, horizontalSize, verticalSize, } = this.formUpdateCinema.value;
    this.adminService.updateCinema(name, idTheaters, theaterType, horizontalSize, verticalSize, _id)
      .then((res: any) => {
        this.message = res.code;        
        this.list();
        // console.log(this.formUpdateCinema.value);
        location.reload();
      })
      .catch(err => err)
  }
  
}
