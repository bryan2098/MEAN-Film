const router = require('express').Router();
const { Booking } = require('../models/BookingModel');
const authenticate = require('../lib/authenticate');
const moment = require("moment");


// delete
router.delete("/deleteBooking/:_id", authenticate, (req, res) => {
    const {_id} = req.params;
    Booking.deleteBooking(_id)
    .then(() => {
        res.send({
            code: 1,
            data: null,
            message: "Delete Success"
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


// detail
// router.get("/detailBooking/:_id", authenticate, (req, res)=>{
//     const {_id} = req.params;
//     Booking.detailBooking(_id)
//     .then(booking => {
//         res.send({
//             code: 1,
//             data: booking,
//             message: ""
//         })
//     })
//     .catch(err => {
//         res.send({
//             code: 0,
//             data: null,
//             message: err
//         })
//     })
// })



// list

router.get("/", authenticate, (req, res) => {
    Booking.listBooking()
    .then(booking => {
        res.send({
            code: 1,
            data: booking,
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

// add 
router.post("/addBooking/:idFrequency", authenticate, (req, res)=>{

    const {dateFilm} = req.body;
    const {idFrequency} = req.params;
    const idUser = req.userId;
    const bookingTime = moment().format("LLLL");

    // total price sẽ thêm vào sau
    Booking.addBooking(idUser, idFrequency, bookingTime, dateFilm)
    .then(booking => {
        req.headers.bookingid = booking._id;
        res.send({
            code: 1,
            data: booking,
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