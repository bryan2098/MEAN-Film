const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const {Ticket, TicketModel} = require("./TicketModel");

// dat ve
const BookingSchema = new Schema({
    idUser: {type: Schema.Types.ObjectId, ref: 'User'}, 
    idFrequency: {type: Schema.Types.ObjectId, ref: 'Frequency'}, 
    bookingTime: { type: String, required: true },
    dateFilm: { type: String, required: true },
    totalPrice: { type: String, default: '0'}
});


const BookingModel = mongoose.model("Booking", BookingSchema);

class Booking extends BookingModel{
    // danh sach
    static listBooking() {
        return new Promise((resolve, reject) => {
            BookingModel.find()
                .populate({path: 'idUser', select: { _id: 1, displayName: 1 }})
                .populate(
                            {
                                path: 'idFrequency',
                                select: { idCinema: 1, idFilm: 1 },
                                populate:
                                    [
                                        { path: 'idCinema', select: {_id: 1, name: 1, theaterType: 1 } },
                                        { path: 'idFilm', select: {_id: 1, name: 1 } }
                                    ]
                            })
                .then(booking => {
                    return resolve(booking);
                })
                .catch(err => {
                    return reject(err.message);
                })
        })
    }


    static addBooking(idUser, idFrequency, bookingTime, dateFilm)
    {
        return new Promise((resolve, reject) => {
            BookingModel.findOne({ idUser, idFrequency, bookingTime, dateFilm })
                .then(check => {
                    if (check)
                        return reject("Cinema exists");
                    else 
                    {
                        BookingModel.create({
                            idUser, idFrequency, bookingTime, dateFilm
                        })
                        .then(booking => {
                            return resolve(booking);
                        }, { new: true })
                    }
                })
                .catch(err => {
                    return reject(new Error(err))
                })
        })
    }



    // xoa
    static deleteBooking(_id) {
        return new Promise((resolve, reject) => {
            BookingModel.findById(_id)
                .then(booking => {
                    if (booking) {

                        // TicketModel.find({idBooking: booking._id})
                        // .then(ts => {
                        //     ts.forEach(cms => {
                        //         Ticket.deleteCinema(cms._id)
                        //         .then(() => {})
                        //     })
                        // })

                        BookingModel.findByIdAndDelete(_id)
                            .then(() => {
                                return resolve()
                            })
                    }
                    else
                        return reject("Booking Not Exists");
                })
                .catch(err => {
                    return reject(err.message);
                })
        })
    }
}

module.exports = {Booking, BookingModel};