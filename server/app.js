require('./lib/connectdb')
const config = require('./config');
const express = require('express')
const app = express()
const bodyParser = require('body-parser').json();
app.use(bodyParser);
const cors = require("cors");
const userRouter = require('./routes/user.route')
const filmRouter = require("./routes/film.router");
const theaterRouter = require("./routes/theater.router");
const frequencyRouter = require("./routes/frequency.router");
const cinemaRouter = require("./routes/cinema.router");
const bookingRouter = require("./routes/booking.router");
const ticketRouter = require("./routes/ticket.router");

app.use(cors());

app.use((req, res, next) => {
    setTimeout(next, 500);
})


app.use(express.static("public"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', ['token','bookingid']);
    // Xét thêm để hiển thị của token trả về, nếu không thì có trả về nhưng không cho phép truy cập
    next();
})


app.use('/user', userRouter)
app.use('/film', filmRouter);
app.use('/theater', theaterRouter);
app.use('/frequency', frequencyRouter);
app.use('/cinema', cinemaRouter);
app.use('/booking', bookingRouter);
app.use('/ticket', ticketRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started!')
})