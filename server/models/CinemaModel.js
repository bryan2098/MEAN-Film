const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Frequency, FrequencyModel} = require("./FrequencyModel");
//rap
const CinemaSchema = new Schema({
    name: { type: String, required: true, unique: true },
    idTheaters: {type: Schema.Types.ObjectId, ref: 'Theaters'},
    theaterType: {type: String, required: true},
    horizontalSize: {type: Number, required: true},
    verticalSize: {type: Number, required: true}
});

const CinemaModel = mongoose.model("Cinema", CinemaSchema);

class Cinema extends CinemaModel{

    // danh sach
    static listCinema() {
        return new Promise((resolve, reject) => {
            CinemaModel.find()
                .populate('idTheaters', { _id: 1, name: 1})
                .then(cinema => {
                    return resolve(cinema)
                })
                .catch(err => {
                    return reject(err.message)
                })
        })
    }

    //them rap
    static addCinema(name, idTheaters, theaterType, horizontalSize, verticalSize) {
        return new Promise((resolve, reject) => {
            CinemaModel.findOne({ name, idTheaters, theaterType })
                .then(check => {
                    if (check)
                        return reject("Cinema exists");
                    else {
                        CinemaModel.create({
                            name, idTheaters, theaterType, horizontalSize, verticalSize
                        })
                            .then(cinema => {
                                return resolve(cinema);
                            }, { new: true })
                    }
                })
                .catch(err => {
                    return reject(new Error(err))
                })
        })
    }


    // cap nhat
    static updateCinema(name, idTheaters, theaterType, horizontalSize, verticalSize, _id)
    {
        return new Promise((resolve, reject) => {
            CinemaModel.findById(_id)
            .then(check => {
                if(check)
                {
                    CinemaModel.findByIdAndUpdate(_id, {
                        $set: { name, idTheaters, theaterType, horizontalSize, verticalSize }
                    })
                    .then(cinema => {
                        return resolve(cinema)
                    }, { new: true })
                }
                else
                    return reject("Cinema Not Exists");
            })
            .catch(err => {
                return reject(err.message);
            })
        })
    }


    // xoa
    static deleteCinema(_id) {
        return new Promise((resolve, reject) => {
            CinemaModel.findById(_id)
                .then(cinema => {
                    if (cinema) {

                        FrequencyModel.find({idCinema: cinema._id})
                        .then(freq => {
                            freq.forEach(cms => {
                                Frequency.deleteFrequency(cms._id)
                                .then(() => {})
                            })
                        })

                        CinemaModel.findByIdAndDelete(_id)
                            .then(() => {
                                return resolve()
                            })
                    }
                    else
                        return reject("Cinema Not Exists");
                })
                .catch(err => {
                    return reject(err.message);
                })
        })
    }
}

module.exports = {Cinema, CinemaModel};