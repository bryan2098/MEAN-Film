const router = require('express').Router();
const { Frequency } = require('../models/FrequencyModel')
const authenticate = require('../lib/authenticate')


// cap nhat
router.put("/updateFrequency", authenticate, (req, res) => {
    const {idCinema, idFilm, timeStart, timeFinish, ticketPrice, _id} = req.body;
    Frequency.updateFrequency(idCinema, idFilm, timeStart, timeFinish, ticketPrice, _id)
    .then(freq => {
        res.send({
            code: 1,
            data: freq,
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
router.delete("/deleteFrequency/:_id", authenticate, (req, res) => {
    const {_id} = req.params;
    Frequency.deleteFrequency(_id)
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


// chi tiet
router.get("/detailFrequency/:_id", authenticate, (req, res) =>{
    const {_id} = req.params;
    Frequency.detailFrequency(_id)
    .then(freq => {
        res.send({
            code: 1,
            data: freq,
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


// danh sach
router.get("/", authenticate, (req, res) => {
    Frequency.listFrequency()
    .then(freq => {
        res.send({
            code: 1,
            data: freq,
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
router.post("/addFrequency", authenticate, (req, res) => {
    const {idCinema, idFilm, timeStart, timeFinish, ticketPrice} = req.body;
    Frequency.addFrequency(idCinema, idFilm, timeStart, timeFinish, ticketPrice)
    .then(freq => {
        res.send({
            code: 1,
            data: freq,
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