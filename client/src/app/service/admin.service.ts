import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Loading, Movie , Theater, Cinema, User, Frequency, Booking, Ticket} from '../type';
@Injectable({
  providedIn: 'root'
})

export class AdminService {
  
  URL = 'https://serverfilm.herokuapp.com/';
  constructor(private http: HttpClient, private router: Router, private store: Store<Loading>) {
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async listTicket(): Promise<Ticket[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.get(`${this.URL}ticket`, {headers})
    .toPromise()
    .then((res: any) => {
      return res.data;
    })
    .catch(err => err)
  }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// quan ly dat cho

// danh sach

async listBooking(): Promise<Booking[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.get(`${this.URL}booking`, {headers})
    .toPromise()
    .then((res: any) => {
      return res.data;
    })
    .catch(err => err)
  }

  // xoa
async deleteBooking(_id: string)
{
  const token = localStorage.getItem('token');
  if (!token) {
    this.store.dispatch({ type: 'LOADED' });
    this.router.navigateByUrl('/signin');
  }
  const headers = new HttpHeaders({ token });
  return this.http.delete(`${this.URL}booking/deleteBooking/${_id}`, {headers})
  .toPromise()
  .then((res: any) => {return res})
  .catch(err => err)
}





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Quan ly suat chieu


// danh sach
async listFrequency(): Promise<Frequency[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.get(`${this.URL}frequency`, {headers})
    .toPromise()
    .then((res: any) => {
      return res.data;
    })
    .catch(err => err)
  }

// them
async addFrequency(idCinema: string, idFilm: string, timeStart: string, timeFinish: string, ticketPrice: string): Promise<Cinema[]>
{
  const token = localStorage.getItem('token');
  if (!token) {
    this.store.dispatch({ type: 'LOADED' });
    this.router.navigateByUrl('/signin');
  }
  const headers = new HttpHeaders({ token });
  return this.http.post(`${this.URL}frequency/addFrequency`, {idCinema, idFilm, timeStart, timeFinish, ticketPrice}, {headers})
  .toPromise()
  .then((res: any) => {
    return res;
  })
  .catch(err => err)
}

// xoa
async deleteFrequency(_id: string)
{
  const token = localStorage.getItem('token');
  if (!token) {
    this.store.dispatch({ type: 'LOADED' });
    this.router.navigateByUrl('/signin');
  }
  const headers = new HttpHeaders({ token });
  return this.http.delete(`${this.URL}frequency/deleteFrequency/${_id}`, {headers})
  .toPromise()
  .then((res: any) => {return res})
  .catch(err => err)
}







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Quan ly user

// danh sach user
  async listUser(): Promise<User[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.get(`${this.URL}user`, {headers})
    .toPromise()
    .then((res: any) => {
      return res.data;
    })
    .catch(err => err)
  }

// cap nhat vai tro
async updateRoleUser(_id: string, role: string): Promise<User[]>
{
  const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.put(`${this.URL}user/updateLevel/${_id}`, {role}, {headers})
    .toPromise()
    .then((res: any) => {return res})
    .catch(err => err)
}


// xoa
async deleteUser(_id: string)
{
  const token = localStorage.getItem('token');
  if (!token) {
    this.store.dispatch({ type: 'LOADED' });
    this.router.navigateByUrl('/signin');
  }
  const headers = new HttpHeaders({ token });
  return this.http.delete(`${this.URL}user/deleteUser/${_id}`, {headers})
  .toPromise()
  .then((res: any) => {return res})
  .catch(err => err)
}



  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // cap nhat
  async updateCinema(name: string, idTheaters: string, theaterType: string, horizontalSize: number, verticalSize: number, _id: string):Promise<Cinema[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.put(`${this.URL}cinema/updateCinema/${_id}`, {name, idTheaters, theaterType, horizontalSize, verticalSize, _id}, {headers})
    .toPromise()
    .then((res: any) => {return res})
    .catch(err => err)
  }



  // danh sach rap
  async listCinema(): Promise<Cinema[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.get(`${this.URL}cinema`, {headers})
    .toPromise()
    .then((res: any) => {
      return res.data;
    })
    .catch(err => err)
  }

  // them rap
  async addCinema(name: string, idTheaters: string, theaterType: string, horizontalSize: number, verticalSize: number): Promise<Cinema[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.post(`${this.URL}cinema/addCinema`, {name, idTheaters, theaterType, horizontalSize, verticalSize}, {headers})
    .toPromise()
    .then((res: any) => {
      return res;
    })
    .catch(err => err)
  }


  // delete rap
  async deleteCinema(_id: string)
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.delete(`${this.URL}cinema/deleteCinema/${_id}`, {headers})
    .toPromise()
    .then((res: any) => {return res})
    .catch(err => err)
  }



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // danh sach cum rap
  async listTheater(): Promise<Theater[]>{
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.get(`${this.URL}theater`, {headers})
    .toPromise()
    .then((res: any) => {
      return res.data.theater;
    })
    .catch(err => err)
  }



  // them cum rap
  async addTheaters(name: String, address: String): Promise<Theater[]>{
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.post(`${this.URL}theater/addTheater`, {name, address}, {headers})
    .toPromise()
    .then((res: any) => {
      return res;
    })
    .catch(err => err)
  }

  // xoa cum rap
  async deleteTheater(id: String):Promise<Theater[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.delete(`${this.URL}theater/deleteTheater/${id}`, {headers})
    .toPromise()
    .then((res: any) => {return res})
    .catch(err => err)
  }

// cap nhat
  async updateTheater(name: String, address: String, _id: String):Promise<Theater[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.put(`${this.URL}theater/updateTheater/${_id}`, {name, address}, {headers})
    .toPromise()
    .then((res: any) => {return res})
    .catch(err => err)
  }



  //////////////////////////////////////////////////////////////////////////////////////////////////////////


  // change poster
  async changePoster(_id: String, formData: FormData): Promise<Movie[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
      return null;
    }
    const headers = new HttpHeaders({ token });
    this.http.put(
      `${this.URL}film/update-poster/${_id}`, formData, { headers })
      .toPromise()
      .then((res: any) => {
        return res;
      })
      .catch(err => err);
  }



  //list movie admin
  async listMovie(): Promise<Movie[]>{

    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });

    return this.http.get(`${this.URL}film`, { headers })
    .toPromise()
    .then((res:any) => {
      return res.data;
    })
    .catch(err => err)
  }


  // add movie admin
  async addMovie(name: String, premiereDate: Date,  content: String, movieTime: Number):Promise<Movie[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
      return null;
    }
    const headers = new HttpHeaders({ token });

    this.http.post(`${this.URL}film/addFilm`,{name, premiereDate, content, movieTime}, {headers})
    .toPromise()
    .then((res:any) => {
      return res;
    })
    .catch(err => err);
  }


  // delete movie admin
  async deleteMovie(_id: String):Promise<Movie[]>
  {
    const token = localStorage.getItem('token');
    if (!token) {
      this.store.dispatch({ type: 'LOADED' });
      this.router.navigateByUrl('/signin');
    }
    const headers = new HttpHeaders({ token });
    return this.http.delete(`${this.URL}film/deleteFilm/${_id}`, {headers})
    .toPromise()
    .then((res: any) => {return res})
    .catch(err => err)
  }

}


