import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../type';
import { UserService } from '../service/user.service';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  SigninForm: FormGroup;
  errorMessage: string;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private store: Store<User>) {
    this.SigninForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')]]
    })
  }

  ngOnInit() {

  }

  Signin() {
    const {email, password} = this.SigninForm.value;
    this.userService.signIn(email, password)
    .then(res => {
      if(res.code === 1)
      {
        this.store.dispatch({
          type: 'USER_LOGIN',
            user: {
              _id: res.data._id,
              displayName: res.data.displayName,
              email: res.data.email,
              role: res.data.role,
              avatar: res.data.avatar,
              phone: res.data.phone
            }
        });
        // console.log(res);
        this.router.navigateByUrl('/');
      }
      else {
        return this.errorMessage = res.message;
      }
    })
    .catch(err => this.errorMessage = err.message);
  }
}
