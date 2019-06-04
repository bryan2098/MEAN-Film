import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import { UserService } from './service/user.service';
import { AdminService } from './service/admin.service';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { userReducer, loading, adminMovieReducer, adminTheaterReducer, adminCinemaReducer, adminUserReducer, adminFrequencyReducer,
adminBookingReducer, adminTicketReducer} from './ngrx/reducer';
import { MustBeGuestGuard } from './guard/must-be-guest.guard';
import { MustBeUserGuard } from './guard/must-be-user.guard';
import { SignupGuard } from './guard/signup.guard';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { MovieComponent } from './movie/movie.component';
import { FrequeciesComponent } from './frequecies/frequecies.component';
import { CinemaComponent } from './cinema/cinema.component';
import { TheaterComponent } from './theater/theater.component';
import { BookingComponent } from './booking/booking.component';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { ListtheaterComponent } from './listtheater/listtheater.component';
import { ListfreqComponent } from './listfreq/listfreq.component';
import { ListfilmComponent } from './listfilm/listfilm.component';


const routes = [
  {path: 'signin', component: SigninComponent, canActivate: [MustBeGuestGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [SignupGuard]},
  {path: '', component: HomeComponent , canActivate: [MustBeUserGuard]},
  {path: 'profile', component: ProfileComponent , canActivate: [MustBeUserGuard]},
  {path: 'admin', component: AdminComponent , canActivate: [MustBeUserGuard]},
  {path: 'adminMovie', component: MovieComponent , canActivate: [MustBeUserGuard]},
  {path: 'adminUSer', component: UserComponent , canActivate: [MustBeUserGuard]},
  {path: 'adminFrequency', component: FrequeciesComponent , canActivate: [MustBeUserGuard]},
  {path: 'adminCinema', component: CinemaComponent , canActivate: [MustBeUserGuard]},
  {path: 'adminTheater', component: TheaterComponent , canActivate: [MustBeUserGuard]},
  {path: 'adminBooking', component: BookingComponent , canActivate: [MustBeUserGuard]},
  {path: 'adminTicket', component: TicketComponent , canActivate: [MustBeUserGuard]},
  {path: 'listtheater', component: ListtheaterComponent , canActivate: [MustBeUserGuard]},
  {path: 'listfreq', component: ListfreqComponent , canActivate: [MustBeUserGuard]},
  {path: 'listfilm', component: ListfilmComponent , canActivate: [MustBeUserGuard]},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    NotfoundComponent,
    AdminComponent,
    UserComponent,
    MovieComponent,
    FrequeciesComponent,
    CinemaComponent,
    TheaterComponent,
    BookingComponent,
    TicketComponent,
    ProfileComponent,
    ListtheaterComponent,
    ListfreqComponent,
    ListfilmComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      userInfo: userReducer,
      adminMovieReducer,
      adminTheaterReducer,
      adminCinemaReducer,
      adminUserReducer,
      adminFrequencyReducer,
      adminBookingReducer,
      adminTicketReducer,
      loading,
      
    })
  ],
  providers: [UserService, AdminService, MustBeGuestGuard, MustBeUserGuard, SignupGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private userService: UserService, private adminService: AdminService) {
  }
 }
