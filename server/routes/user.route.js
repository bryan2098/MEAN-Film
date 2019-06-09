const router = require('express').Router();
const {User} = require('../models/UserModel')
const authenticate = require('../lib/authenticate')
const upload = require('../lib/upload');
const {Ticket} = require("../models/TicketModel");
const {hash} = require("../lib/bcrypt");




// danh sach ticket nguoi dung
router.get("/listUserTicket/:_id", authenticate, (req, res) => {
    Ticket.listUserTicket(req.params._id)
    .then(ticket => {
        res.send({
            code: 1,
            data: ticket,
            message: null
        })
    })
    .catch(err => {
        res.send({
            code: 0,
            data: "",
            message: err.message
        })
    })
})





//update user info
router.put("/updateInfoUser", authenticate, (req, res) => {

    const {displayName, phone} = req.body;
    const _id = req.userId;

     User.updateInfoUser(_id, displayName, phone)
    .then(user => {
        res.send({
            code: 1,
            data: user,
            message: null
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

// danh sach user (admin)
router.get("/", authenticate, (req, res) => {
    User.listUser()
    .then(users => {
        res.send({
            code: 1,
            data: users,
            message: null
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


// cap nhat mat khau
router.put("/updatePassword", authenticate, (req, res) => {
    const _id = req.userId;
    const {password} = req.body;


    User.updatePassword(_id, password)
    .then(user => {
        res.send({
            code: 1,
            data: user,
            message: null
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


// xoa tai khoan (admin quan ly)
router.delete("/deleteUser/:_id", authenticate, (req, res) => {
    const {_id} = req.params;
    User.deleteUser(_id)
    .then((data) => {
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



// cap nhat level (admin quan ly)
router.put("/updateLevel/:_id", authenticate, (req, res) => {
    const {role} = req.body;
    const {_id} = req.params;
    User.updateLevel(_id, role)
    .then(user => {
        res.send({
            code: 1,
            data: user,
            message: null
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


// danh sach chi tiet ticket nguoi dung
router.get("/detailTicket/:_id", authenticate, (req, res) => {
    const {_id} = req.params;
    Ticket.detailTicket(_id)
    .then(ticket => {
        res.send({
            code: 1,
            data: ticket,
            message: null
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



// Check token
router.post("/check", authenticate, (req, res)=>{
    const id = req.userId;
    User.findUser(id)
    .then(user=>{
        res.send({ 
            code: 1,
            data: user,
            message: ''
        })
    })
    .catch(err=>{
        res.send({ 
            code: 0,
            data: null,
            message: err
        })
    })
})

//Update avatar
router.put('/update-avatar/:_id',authenticate,(req,res)=>{
    upload.single('images') (req, res, err =>{ 
        if(err) res.send({
            code: 0,
            data: null,
            message: err
        })
        //save db
        const _id = req.params._id;
        User.changeAvatar(_id, req.file.filename)
        .then(user=>res.send({
            code: 1,
            data: user,
            message: ''
        }))
        .catch(err=>res.send({
            code: 0,
            data: null,
            message: err
        }))
    })
})



//Dang ky
router.post('/signup',(req,res)=>{
    const { email, password, name, phone } = req.body
    User.signUp(email, name, password, phone)
    .then(user=>{
        res.send({
            code: 1,
            data: user,
            message: ''
        })
    })
    .catch(error=>{
        res.send({
            code: 0,
            data: null,
            message: error.message
        })
    })
}) 


// Dang nhap
router.post('/signin',(req,res)=>{
    const { email, password } = req.body
    User.signIn(email,password)
    .then(user=>{
        res.send({
            code: 1,
            data: user,
            message: ''
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
}) 



module.exports = router