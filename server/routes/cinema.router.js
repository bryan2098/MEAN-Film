const router = require('express').Router();
const { Cinema } = require('../models/CinemaModel');
const authenticate = require('../lib/authenticate');




// cap nhat
router.put("/updateCinema/:_id", authenticate, (req, res) => {
    const { name, idTheaters, theaterType, horizontalSize, verticalSize } = req.body;
    const {_id} = req.params;
    Cinema.updateCinema(name, idTheaters, theaterType, horizontalSize, verticalSize, _id)
    .then(cinema => {
        res.send({
            code: 1,
            data: cinema,
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


// xoa
router.delete("/deleteCinema/:_id", authenticate, (req, res) => {
    const { _id } = req.params;
    Cinema.deleteCinema(_id)
        .then(() => {
            res.send({
                code: 1,
                data: null,
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


//chi tiet
// router.get("/detailCinema/:_id", authenticate, (req, res) => {
//     const { _id } = req.params;
//     Cinema.detailCinema(_id)
//         .then(cinema => {
//             res.send({
//                 code: 1,
//                 data: cinema,
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


// danh sach
router.get("/", authenticate, (req, res) => {
    Cinema.listCinema()
        .then(cinema => {
            res.send({
                code: 1,
                data: cinema,
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


// them 
router.post("/addCinema", authenticate, (req, res) => {
    const { name, idTheaters, theaterType, horizontalSize, verticalSize } = req.body;

    Cinema.addCinema(name, idTheaters, theaterType, horizontalSize, verticalSize)
        .then(cinema => {
            res.send({
                code: 1,
                data: cinema,
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


module.exports = router;