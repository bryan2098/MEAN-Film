const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Cinema, CinemaModel} = require("./CinemaModel")

//Cum rap
const TheatersSchema = new Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true }
})

const TheatersModel = mongoose.model("Theaters", TheatersSchema);

class Theater extends TheatersModel {


    //Cap nhat cum rap
    static updateTheater(name, address, _id)
    {
        return new Promise((resolve, reject) => {
            TheatersModel.findById(_id)
            .then(check => {
                if(check)
                {
                    TheatersModel.findByIdAndUpdate(_id, {
                        $set: { name, address }
                    })
                    .then(theater => {
                        return resolve(theater)
                    }, { new: true })
                }
                else
                    return reject("Theater Not Exists");
            })
            .catch(err => {
                return reject(err.message);
            })
        })
    }


    //Xoa cum rap
    static deleteTheater(_id) {
        return new Promise((resolve, reject) => {
            TheatersModel.findById(_id)
                .then(checkTheater => {
                    if (checkTheater) {

                        CinemaModel.find({idTheaters: checkTheater._id})
                        .then(cinemas => {
                            cinemas.forEach(cms => {
                                Cinema.deleteCinema(cms._id)
                                .then(() => {})
                            })
                        })

                        TheatersModel.findByIdAndDelete(_id)
                            .then(() => {
                                return resolve()
                            })
                    }
                    else
                        return reject("Theater Not Exists");
                })
                .catch(err => {
                    return reject(err.message);
                })
        })
    }


    // chi tiet
    static detailTheater(_id) {
        return new Promise((resolve, reject) => {
            TheatersModel.findById(_id)
                .then(theater => {
                    if (theater)
                        return resolve(theater)
                    else
                        return reject("Theater exists");
                })
                .catch(err => {
                    return reject(err.message);
                })
        })
    }

    // Danh sach cum rap
    static showListTheater() {
        return new Promise((resolve, reject) => {
            TheatersModel.find()
                .then(theater => {
                    return resolve({ theater })
                })
                .catch(err => {
                    return reject(err.message)
                })
        })
    }


    // Them cum rap
    static addTheater(name, address) {
        return new Promise((resolve, reject) => {
            TheatersModel.findOne({ name })
                .then(checkTheater => {
                    if (checkTheater)
                        return reject("Theater exists");
                    else {
                        TheatersModel.create({
                            name, address
                        })
                            .then(theater => {
                                return resolve(theater);
                            }, { new: true })
                    }
                })
                .catch(err => {
                    return reject(new Error(err))
                })
        })
    }
}


module.exports = { Theater, TheatersModel };