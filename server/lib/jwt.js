const jwt = require('jsonwebtoken')
const SECRET_KEY = 'chuoibaomat123456789';

//Dang nhap
function sign(obj){
    return new Promise((resolve, reject)=>{
        const token = jwt.sign(obj,SECRET_KEY,{expiresIn: '2 days'})
        if(!token) return reject(new Error('Can not sign token!'));
        return resolve(token) 
    })
}


//Kiem chung token
function verify(token){
    return new Promise((resolve, reject)=>{
        const obj = jwt.verify(token,SECRET_KEY)
        if(!obj)return reject(new Error('Can not verify token!'));
        delete obj.exp
        delete obj.iat
        return resolve(obj)
    })
}


module.exports = { sign, verify }