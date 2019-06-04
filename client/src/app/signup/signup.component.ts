import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {UserService} from './../service/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  SignupForm: FormGroup;
  errorMessage: string;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.SignupForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')]],
      password_confirm: ['', [Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')]],
      phone: ['', [Validators.minLength(10), Validators.pattern('^[0-9]+$')]]
    })
  }

  ngOnInit() {
  }


  // Dang ky
  Signup() {
    const { email, password, password_confirm, name, phone } = this.SignupForm.value;
    if (password !== password_confirm) {
      return this.errorMessage = 'Vui lòng kiểm tra lại mật khẩu!';
    }
    this.userService.signUp(email, name, password, phone)
    .then(res => {
      if(res.code === 1)
        return this.router.navigateByUrl("/signin");
      else
          this.SignupForm.setValue({email: '', name: '', password: '', password_confirm: '', phone: ''});
          return this.errorMessage = res.message;
    })
    .catch(e => {
      this.errorMessage = e.message;
    });
  }
}
