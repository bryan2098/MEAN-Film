const router = require('express').Router();
const { Theater } = require("../models/TheatersModel");
const authenticate = require('../lib/authenticate');



// cap nhat
router.put("/updateTheater/:_id", authenticate, (req, res)=>{
    const {name, address} = req.body;
    const {_id} = req.params;
    Theater.updateTheater(name, address, _id)
    .then(theater => {
        res.send({
            code: 1,
            data: theater,
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


//xoa
router.delete("/deleteTheater/:_id", authenticate, (req, res) => {
    const { _id } = req.params;
    Theater.deleteTheater(_id)
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



// chi tiet 
router.get("/detaiTheater/:_id", authenticate, (req, res) => {
    const { _id } = req.params;
    Theater.detailTheater(_id)
        .then(theater => {
            res.send({
                code: 1,
                data: theater,
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


// danh sach cum rap
router.get("/", authenticate, (req, res) => {
    Theater.showListTheater()
        .then(theater => {
            res.send({
                code: 1,
                data: theater,
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


// them cum rap
router.post("/addTheater", authenticate, (req, res) => {
    const { name, address } = req.body;
    Theater.addTheater(name, address)
        .then(theater => {
            res.send({
                code: 1,
                data: theater,
                message: ""
            })
        })
        .catch(err => {
            res.send({
                code: 0,
                data: "",
                message: err
            })
        })
})

module.exports = router;