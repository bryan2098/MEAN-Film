import { Component, OnInit } from '@angular/core';
import { User } from '../type';
import { Store } from '@ngrx/store';
import { AdminService } from '../service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  formUpdateLevel: FormGroup;
  message: string;
  constructor(private store: Store<User>, private adminService: AdminService, private fb: FormBuilder) {
    this.formUpdateLevel = this.fb.group({
      role: ["1", Validators.required]
    })
   }

  ngOnInit() {
    this.list();
    this.store.select('adminUserReducer')
      .subscribe(l => {
        this.users = l;
      })
  }

  
  //  danh sach
  list() {
    this.adminService.listUser()
      .then(list => {
        this.store.dispatch({ type: 'INIT', users: list })
      })
      .catch(err => console.error(err));
  }


  // cap nhat vai tro
  UpdateRole(_id: string)
  {
    this.adminService.updateRoleUser(_id, this.formUpdateLevel.value.role)
      .then((res: any) => {
        this.message = res.code;        
        this.list();
      })
      .catch(err => err)
  }


  // delete
  DeleteUser(_id: string)
  {
    this.adminService.deleteUser(_id)
    .then((res: any) => {
      this.message = res.code;        
      this.list();
    })
    .catch(err => err)
  }

}
