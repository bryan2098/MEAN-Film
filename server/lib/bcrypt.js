const bcrypt = require('bcrypt')

//Ma hoa 8 vong
function hash(password){
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password,8,(err,hash)=>{
            if(err) return reject(err)
            return resolve(hash)
        })
    })
}

//Giai ma hoa
function compare(password,hash){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password,hash,(err,result)=>{
            if(err) return reject(err)
            if(!result) return reject(new Error('Password invalid!'))
            return resolve(result)
        })
    })
}
module.exports = { hash, compare }