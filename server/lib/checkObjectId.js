function checkObjectId(Obj, id){
    return new Promise((resolve, reject)=>{
        Obj.findById(id)
        .then(()=>{resolve(true)})
        .catch(()=>reject(false))
    })
}

module.exports =  checkObjectId 