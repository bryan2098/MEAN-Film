const { sign, verify } = require('./jwt')

//Chung thuc cookie
function authenticate(req, res, next){
    const { token } = req.headers;
    if(!token) 
        return res.send({
            code: 0,
            data: null,
            message: 'Can not find token!'
        })
    //Kiem chung token
    verify(token)
    .then(obj=>{
        return sign(obj).then(token => {
            req.userId = obj._id 
            next();
        })
    })
    .catch(err=>{
        res.send({
            code: 0,
            data: null,
            message: err.message
        })
    })
}
module.exports = authenticate