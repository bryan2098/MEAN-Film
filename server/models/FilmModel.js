const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {Frequency, FrequencyModel} = require("./FrequencyModel");
// film
const FilmSchema = new Schema({
    name: { type: String, required: true, unique: true }, 
    premiereDate: { type: String, required: true},
    poster: {type: String, default: 'default.jpg'}, 
    content: {type: String, required: true}, 
    movieTime: {type: Number, required: true}
});

const FilmModel = mongoose.model("Film", FilmSchema);

class Film extends FilmModel {
    // danh sach
    static showListFilm() {
        return new Promise((resolve, reject) => {
            FilmModel.find()
                .then(films => {
                    return resolve( films )
                })
                .catch(err => {
                    return reject(err.message)
                })
        })
    }


    //them 
    static addFilm(name, premiereDate, poster, content, movieTime ) {
        return new Promise((resolve, reject) => {
            FilmModel.findOne({ name })
                .then(check => {
                    if (check)
                        return reject("Film exists");
                    else {
                        {
                            FilmModel.create({name, premiereDate, poster, content, movieTime})
                            .then(film => {
                                return resolve(film);
                            }, { new: true })
                        }
                }
                })
                .catch(err => {
                    return reject(new Error(err))
                })
        })
        }

    //update poster
    static async changePoster(_id, poster){
        const film = await FilmModel.findOneAndUpdate(
            { _id },
            { poster },
            { new: true}
        )
        if(!film) throw new Error('Can not find film!')
        return film;
    }

    // xoa
    static deleteFilm(_id) {
        return new Promise((resolve, reject) => {
            FilmModel.findById(_id)
                .then(film => {
                    if (film) {

                        FrequencyModel.find({idFilm: film._id})
                        .then(freq => {
                            freq.forEach(cms => {
                                Frequency.deleteFrequency(cms._id)
                                .then(() => {})
                            })
                        })

                        FilmModel.findByIdAndDelete(_id)
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


module.exports = {Film, FilmModel};