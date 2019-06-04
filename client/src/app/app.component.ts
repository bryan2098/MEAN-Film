import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { Store } from '@ngrx/store';
import { Loading } from './type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: boolean;
  constructor(private userService: UserService, private store: Store<Loading>, private router: Router) {
    this.store.select('loading').subscribe(l => this.loading = l);
    this.userService.check()
    .then((res: any) => {
      if (res.code === 1) {
        this.store.dispatch({
          type: 'USER_LOGIN',
          user: res.data
        });
      }
    })
    .catch(err => {
      if (this.router.url === '/signup') {
        return this.router.navigateByUrl('signup');
      }
      return this.router.navigateByUrl('signin');
    });
  }
}
