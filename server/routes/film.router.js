const router = require('express').Router();
const { Film } = require('../models/FilmModel')
const authenticate = require('../lib/authenticate')
const upload = require('../lib/upload');



//Update poster
router.put('/update-poster/:_id',authenticate,(req,res)=>{
    upload.single('images') (req, res, err =>{ 
        if(err) res.send({
            code: 0,
            data: null,
            message: err
        })
        //save db
        const {_id} = req.params;
        Film.changePoster(_id, req.file.filename)
        .then(film=>res.send({
            code: 1,
            data: film,
            message: ''
        }))
        .catch(err=>res.send({
            code: 0,
            data: null,
            message: err
        }))
    })
})



//danh sach phim
router.get("/", authenticate, (req, res) => {
    Film.showListFilm()
        .then(films => {
            res.send({
                code: 1,
                data: films,
                message: ""
            })
        })
        .catch(err => {
            res.send({
                code: 0,
                data: "",
                message: ""
            })
        })
})


// 1 phim 
// router.get("/detailFilm/:_id", authenticate, (req, res) => {
//     const { _id } = req.params;
//     Film.detailFilm(_id)
//         .then(film => {
//             res.send({
//                 code: 1,
//                 data: film,
//                 message: ""
//             })
//         })
//         .catch(err => {
//             res.send({
//                 code: 0,
//                 data: null,
//                 message: err
//             })
//         })
// })


// them phim
router.post("/addFilm", authenticate, (req, res) => {
    const { name, premiereDate, content, movieTime } = req.body;
        Film.addFilm(name, premiereDate, 'default.jpg', content, movieTime)
            .then(film => {
                res.send({
                    code: 1,
                    data: film,
                    message: ""
                })
            })
            .catch(err => {
                res.send({
                    code: 0,
                    data: null,
                    message: err
                })
            })
        })



//cap nhat phim 
// router.put("/updateFilm", authenticate, (req, res) => {
//     const { _id, name, premiereDate, content, movieTime } = req.body;
//     if (!req.file) {
//         Film.updateFilmNotImage(_id, name, premiereDate, content, movieTime)
//             .then(film => {
//                 res.send({
//                     code: 1,
//                     data: film,
//                     message: ""
//                 })
//             })
//             .catch(err => {
//                 res.send({
//                     code: 0,
//                     data: null,
//                     message: err
//                 })
//             })
//     }
//     else {
//         Film.updateFilmImage(_id, name, premiereDate, req.file.filename, content, movieTime)
//             .then(film => {
//                 res.send({
//                     code: 1,
//                     data: film,
//                     message: ""
//                 })
//             })
//             .catch(err => {
//                 res.send({
//                     code: 0,
//                     data: null,
//                     message: err
//                 })
//             })
//     }
// })


//xoa phim
router.delete("/deleteFilm/:_id", authenticate, (req, res) => {
    const { _id } = req.params;
    Film.deleteFilm(_id)
        .then(() => {
            res.send({
                code: 1,
                data: "",
                message: "Delete Successfully"
            })
        })
        .catch(err => {
            res.send({
                code: 0,
                data: null,
                message: err
            })
        })
})

module.exports = router;