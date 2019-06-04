export interface User {
    _id: string;
    email: string;
    displayName: string;
    role?: string;
    phone?: string;
    status?: number
}
export const ListUser: Array<User> = [];


// Cinema 
export interface Cinema{
    _id: string;
    name: string;
    idTheaters?: string;
    theaterType?: string;
    horizontalSize?: number;
    verticalSize?: number;
}
export const ListCinema: Array<Cinema> = [];




// Movie
export interface Movie{
    _id: string;
    name: string;
    premiereDate: Date;
    images: File;
    content: string;
    movieTime: number;
}

export const ListMovie: Array<Movie> = [];


// Theater
export interface Theater {
    _id: string;
    name: string;
    address: string;
}

export const ListTheater: Array<Theater> = [];



// Frequencies
export interface Frequency
{
    _id: string;
    idCinema: string;
    idFilm: string;
    timeStart: string;
    timeFinish:string;
    ticketPrice: string;
} 
export const ListFrequency: Array<Frequency> = [];

// booking
export interface Booking
{
    idUser: string;
    idFrequency: string;
    bookingTime: string;
    dateFilm: string;
    totalPrice?: string;
}
export const ListBooking: Array<Booking> = [];

// ticket
export interface Ticket {
    idBooking: string;
    seatCode: string;
    price: number;
}

export const ListTicket: Array<Ticket> = [];

export interface Loading {
    loading: boolean;
}