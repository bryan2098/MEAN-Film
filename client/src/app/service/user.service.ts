import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Loading, Movie , Booking} from '../type';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  URL = 'https://serverfilm.herokuapp.com/';
  constructor(private http: HttpClient, private router: Router, private store: Store<Loading>) {
  }

  // danh sach da dat
  async listUserTicket(_id: string)
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.get(`${this.URL}user/listUserTicket/${_id}`, { headers })
    .toPromise()
    .then((res:any) => {
      return res;
    })
    .catch(err => err)
  }


  //  them dat cho
  async addBooking(idFrequency: string, dateFilm: string): Promise<Booking[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.post(`${this.URL}booking/addBooking/${idFrequency}`, {idFrequency, dateFilm}, {headers})
    .toPromise()
    .then((res: any) => {
      localStorage.setItem('bookingid', res.data._id);
      // console.log(res);
      return res;
    })
    .catch(err => err)
  }

  

  // dang ky
  async signUp(email: String, name: String, password: String, phone: String): Promise<any> {
    return this.http.post(`${this.URL}user/signup`, { email, name, password, phone })
      .toPromise()
      .then(res => res)
      .catch(err => err)
  }


  // dang nhap
  async signIn(email: String, password: String): Promise<any> {
    return this.http.post(`${this.URL}user/signin`, { email, password })
      .toPromise()
      .then((res: any) => {
        localStorage.setItem('token', res.data.token);
        return res;
      })
      .catch(err => err)
  }

  // check
  async check() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      return Promise.reject('Token not provider!');
    } else {
      const headers = new HttpHeaders({ token });
      return this.http.post(
        `${this.URL}user/check`, // uri
        null, // body
        { headers, observe: 'response' } // headers
      )
        .toPromise()
        .then((res: any) => {
          if (res.body.code === 1) {
            this.store.dispatch({ type: 'LOADED' });
            return res.body;
          } else {
            return this.router.navigateByUrl('/signin');
          }
        })
        .catch(err => err);
    }
  }

  // Thoat
  logOut() {
    localStorage.removeItem('token');
    return this.router.navigateByUrl('/signin');
  }


  // cap nhat thong tin
  async updateInfo(_id: string, displayName: string, phone: string)
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.put(`${this.URL}user/updateInfoUser`, {_id, displayName, phone}, { headers })
    .toPromise()
    .then((res:any) => {
      return res;
    })
    .catch(err => err)
  }

  // doi mat khau
  async updatePassword(_id: string, password: string)
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.put(`${this.URL}user/updatePassword`, {_id, password}, { headers })
    .toPromise()
    .then((res:any) => {
      return res;
    })
    .catch(err => err)
  }


    // update avatar user
    async changeAvatar(_id: String, formData: FormData): Promise<Movie[]> {
      const token = localStorage.getItem('token');
      if (!token) {
        this.store.dispatch({ type: 'LOADED' });
        this.router.navigateByUrl('/signin');
        return null;
      }
      const headers = new HttpHeaders({ token });
      this.http.put(`${this.URL}user/update-avatar/${_id}`, formData, { headers })
        .toPromise()
        .then((res: any) => {
          return res;
        })
        .catch(err => err);
    }
}


