import { Store, Action } from '@ngrx/store';
import { User, ListUser, Loading, Movie , ListMovie, Theater, ListTheater, Cinema, ListCinema, Frequency, ListFrequency,
Booking, ListBooking, Ticket, ListTicket} from '../type';


export function userReducer(state: Store<User> = null, action: any) {
    if (action.type === 'USER_LOGIN') {
        return action.user;
    }
    if (action.type === 'USER_LOGOUT') {
        return null;
    }
    if (action.type === 'USER_INFO') {
        return action.user;
    }
    if(action.type === 'USER_UPDATE')
        return action.user;
    return state;
}



export function loading(state = true, action: Action) {
    if (action.type === 'LOADED') { return false; }
    return state;
}


export function adminMovieReducer(state: Movie[] = ListMovie, action: any) : Movie[]
{
    if (action.type === 'INIT') {
        return action.movies;
    }
    return state;
}

export function adminUserReducer(state: User[] = ListUser, action: any) : User[]
{
    if (action.type === 'INIT') {
        return action.users;
    }
    return state;
}


export function adminTheaterReducer(state: Theater[] = ListTheater, action: any) : Theater[]
{
    if (action.type === 'INIT') {
        return action.theaters;
    }
    return state;
}

export function adminCinemaReducer(state: Cinema[] = ListCinema, action: any) : Cinema[]
{
    if (action.type === 'INIT') {
        return action.cinemas;
    }
    return state;
}


export function adminFrequencyReducer(state: Frequency[] = ListFrequency, action: any) : Frequency[]
{
    if (action.type === 'INIT') {
        return action.frequencies;
    }
    return state;
}


export function adminBookingReducer(state: Booking[] = ListBooking, action: any) : Booking[]
{
    if (action.type === 'INIT') {
        return action.bookings;
    }
    return state;
}

export function adminTicketReducer(state: Ticket[] = ListTicket, action: any) : Ticket[]
{
    if (action.type === 'INIT') {
        return action.tickets;
    }
    return state;
}