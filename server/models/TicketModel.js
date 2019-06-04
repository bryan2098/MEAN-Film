const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { BookingModel } = require("./BookingModel");
const { UserModel } = require("./UserModel");
const TicketSchema = new Schema({
    idBooking: {type: Schema.Types.ObjectId, ref: 'Booking'},
    //Ma ghe
    seatCode: { type: String, required: true },
    price: { type: Number, required: true }
})

const TicketModel = mongoose.model("Ticket", TicketSchema);

class Ticket extends TicketModel {

    // chi tiet tung ticket
    static detailTicket(_id)
    {
        return new Promise((resolve, reject) => {
            TicketModel.findById(_id)
            .populate({ 
                path: 'idBooking', select: { idUser: 1, idFrequency: 1, bookingTime: 1 },
                populate:
                    [
                        {path: 'idUser', select: { displayName: 1 }},
                        {path: 'idFrequency', select: { idCinema: 1, idFilm: 1 }, 
                        populate:
                            [ { path: 'idCinema', select: { name: 1, theaterType: 1 } },{ path: 'idFilm', select: { name: 1 } }]
                        }
                    ]
            })
            .then(ticket => {
                return resolve(ticket);
            })
            .catch(err => {
                return reject(err.message);
            })    
        })
    }


    // danh sach theo nguoi dung dat
    static listUserTicket(_id) {
        return new Promise((resolve, reject) => {
            UserModel.findById(_id)
            .then(user => {
                if (user) {
                    BookingModel.find({ idUser: user._id })
                    .then(booking => {
                        if (booking) {

                            booking.forEach(bk => {
                                TicketModel.find({idBooking: bk._id})
                                .sort([['idBooking', -1]])
                                .populate({
                                    path: 'idBooking', select: { idUser: 1, idFrequency: 1, bookingTime: 1 },
                                    populate:
                                        [
                                            {path: 'idUser', select: { displayName: 1 }},
                                            {path: 'idFrequency', select: { idCinema: 1, idFilm: 1 }, 
                                            populate:
                                                [ { path: 'idCinema', select: { name: 1, theaterType: 1 } },{ path: 'idFilm', select: { name: 1 } }]
                                            }
                                        ]
                                })
                                .then(ticket => {
                                    return resolve(ticket);
                                })    
                            })

                            
                        }
                        else
                            return reject("Booking not exists");
                        
                    })
                }
                else
                    return reject("User not exists");

                })
                .catch(err => {
                    return reject(err.message);
                })
        })
    }


    // danh sach ticket
    static listTicket() {
        return new Promise((resolve, reject) => {
            TicketModel.find()
                .populate({
                    path: 'idBooking', select: { idUser: 1, idFrequency: 1, bookingTime: 1 },
                    populate:
                        [
                            {
                                path: 'idUser', select: { displayName: 1 }
                            },
                            {
                                path: 'idFrequency',
                                select: { idCinema: 1, idFilm: 1 },
                                populate:
                                    [
                                        { path: 'idCinema', select: { name: 1, theaterType: 1 } },
                                        { path: 'idFilm', select: { name: 1 } }
                                    ]
                            }
                        ]
                })
                .then(ticket => {
                    return resolve(ticket);
                })
                .catch(err => {
                    return reject(err);
                })
        })
    }



    // them ve - phai xu ly mang cac checkbox
    static addTicket(idBooking, seatCode, price) {
        return new Promise((resolve, reject) => {
            TicketModel.create({
                idBooking,
                seatCode,
                price
            })
                .then(ticket => {
                    return resolve(ticket);
                }, { new: true })
                .catch(err => {
                    return reject(err.message);
                })
        })
    }
}

module.exports = { TicketModel, Ticket };