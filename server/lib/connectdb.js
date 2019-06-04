const mongoose = require('mongoose')
mongoose.connect('mongodb://serverfilm:nguyentri1998@ds259806.mlab.com:59806/serverfilm',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB connected!')
});


