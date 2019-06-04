import { Component, OnInit } from '@angular/core';
import { User } from '../type';
import { Store } from '@ngrx/store';
import { UserService } from '../service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  token: String = localStorage.getItem('token');
  UpdateInfoForm: FormGroup;
  ChangePasswordForm: FormGroup;
  ChangeAvatarForm: FormGroup;
  message: String;
  messageChangePassword: String;
  errorMessage: String;
  avt: File;
  constructor(private store: Store<User>, private userService: UserService, private fb: FormBuilder) {
    this.UpdateInfoForm = this.fb.group({
      displayName: ['', Validators.required],
      phone: ['',  Validators.required],
    })
    this.ChangePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')]],
      password_cof: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')]]
    })
    this.ChangeAvatarForm = this.fb.group({
      images: ['',  Validators.required]
    })
    this.store.select('userInfo').subscribe(u =>{
      this.user = u;
    });
   }

  ngOnInit() {
  }

  UpdateInfo()
  {
    const {_id} = this.user;
    const {displayName, phone} = this.UpdateInfoForm.value;
    this.userService.updateInfo(_id, displayName, phone)
    .then(res => {
      this.message = res.code;

      setTimeout(()=> {location.reload()}, 500);
    })
    .catch(err => err)
  }




  // update password
  ChangePassword()
  {
    const {_id} = this.user;
    const {password, password_cof} = this.ChangePasswordForm.value;
    if (password !== password_cof) {
      return this.errorMessage = 'Vui lòng kiểm tra lại mật khẩu!';
    }
    else
    {
      this.userService.updatePassword(_id, password)
      .then(res => {
        return this.messageChangePassword = res.code;
      })
      .catch(err => err)
    }
    
  }


  //update avatar

  selectFile(fileInfo) {
    this.avt = fileInfo.target.files[0];
  }


  changeAvatar(_id: string)
  {
    const formData = new FormData();
    formData.append('images', this.avt, this.avt.name);
    this.userService.changeAvatar(_id, formData);
    
    setTimeout(() => {
      location.reload();
    }, 500)
  }
}
