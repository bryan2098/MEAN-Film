const router = require('express').Router();
const { Ticket } = require("../models/TicketModel");
const authenticate = require('../lib/authenticate');
const { BookingModel } = require("../models/BookingModel");
const { FrequencyModel } = require("../models/FrequencyModel");





// chi tiet admin
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



// danh sach admin
router.get("/", authenticate, (req, res)=>{
    Ticket.listTicket()
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


// khoi tao ticket
router.post("/addTicket", authenticate, (req, res) => {
    const { bookingid } = req.headers;
    const { seatCode } = req.body;
    
    if(bookingid)
    {
        BookingModel.findById(bookingid)
        .then(booking => {
            FrequencyModel.findById(booking.idFrequency)
                .then(freq => {
                    
                    // cap nhat tong tien
                    BookingModel.findByIdAndUpdate(bookingid, {
                            totalPrice: freq.ticketPrice * seatCode.length
                    }, { new: true }).then(() => { }).catch(err => { console.log(err) })

                    // Duyet mang de lay tung ma ghe
                    seatCode.forEach(code => {
                        Ticket.addTicket(bookingid, code, freq.ticketPrice)
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
                })
        })
        .catch(err => {
            console.log(err)
        });
    }
})


module.exports = router;