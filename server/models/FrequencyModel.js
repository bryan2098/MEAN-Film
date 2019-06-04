const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {BookingModel, Booking} = require("./BookingModel");
//Suat chieu
const FrequencySchema = new Schema({
    idCinema: {type: Schema.Types.ObjectId, ref: 'Cinema'},
    idFilm:{type: Schema.Types.ObjectId, ref: 'Film'},
    timeStart: {type: String, required: true},
    timeFinish: {type: String, required: true},
    ticketPrice: {type: Number, required: true}
});

const FrequencyModel = mongoose.model("Frequency", FrequencySchema);

class Frequency extends FrequencyModel
{

    // cap nhat
    static updateFrequency(idCinema, idFilm, timeStart, timeFinish, ticketPrice, _id)
    {
        return new Promise((resolve, reject)=>{
            FrequencyModel.findById(_id)
            .then(check => {
                if(check)
                {
                    FrequencyModel.findByIdAndUpdate(_id, {
                        idCinema, 
                        idFilm, 
                        timeStart, 
                        timeFinish, 
                        ticketPrice
                    })
                    .populate('idCinema', { _id: 1, name: 1})
                    .populate('idFilm', { _id: 1, name: 1})
                    .then(freq => {
                        return resolve(freq);
                    }, {new: true})
                }
                else
                    return reject("Data not exists");
            })
            .catch(err => {
                return reject(err.message);
            })
            
        })
    }

    // xoa
    static deleteFrequency(_id)
    {
        return new Promise((resolve, reject) => {
            FrequencyModel.findById(_id)
            .then(freq => {
                if(freq)
                {
                    BookingModel.find({idFrequency: freq._id})
                    .then(booking => {
                        // xoa dat cho
                        booking.forEach(bk => {
                            Booking.deleteBooking(bk._id)
                            .then(() => {})
                        })


                        // suat chieu
                        FrequencyModel.findByIdAndDelete(_id)
                        .then(() => {
                        return resolve();
                        })
                    })    
                }
                else
                    return reject("Data not exists");
            })
            .catch(err => {
                return reject(err.message);
            })
        })
    }

    // chi tiet
    static detailFrequency(_id)
    {
        return new Promise((resolve, reject)=>{
            FrequencyModel.findById(_id)
            .populate('idCinema', { _id: 1, name: 1})
            .populate('idFilm', { _id: 1, name: 1})
            .then(freq => {
                if(freq)
                    return resolve(freq);
                else
                    return reject("Data not exists");
            })
            .catch(err => {
                return reject(err.message);
            })
        })
    }


    // danh sach
    static listFrequency()
    {
       return new Promise((resolve, reject)=>{
           FrequencyModel.find()
           .populate('idCinema', { _id: 1, name: 1, theaterType: 1})
           .populate('idFilm', { _id: 1, name: 1, poster: 1})
           .sort({idFilm: -1})
           .then(freq => {
                return resolve(freq);
           })
           .catch(err => {
                return reject(err.message);
           })
       })
    }

    // them
    static addFrequency(idCinema, idFilm, timeStart, timeFinish, ticketPrice)
    {
        return new Promise((resolve, reject) => {
            FrequencyModel.findOne({idCinema, idFilm, timeStart, timeFinish})
            .then(check => {
                if(check)
                    return reject("Data exists");
                else
                {
                    FrequencyModel.create({
                        idCinema, 
                        idFilm, 
                        timeStart, 
                        timeFinish, 
                        ticketPrice
                    })
                    .then(freq => {
                        return resolve(freq);
                    }, { new: true })
                }
            })
            .catch(err => {
                return reject(err.message);
            })
        })
    }
    
}

module.exports = {Frequency, FrequencyModel};