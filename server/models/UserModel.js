const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { hash, compare } = require('../lib/bcrypt')
const { sign, verify } = require('../lib/jwt')
const {Booking, BookingModel} = require("./BookingModel");
const {Ticket, TicketModel} = require("./TicketModel");


const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: { type: String, required: true, default: 'Chưa xác thực'},
    avatar: { type: String, default: 'default.jpg' },
    phone: { type: String, required: true },
    role: { type: String, required: true, default: 1 },
    status: { type: Number, required: true, default: 1 }
});

const UserModel = mongoose.model('User', UserSchema)

class User extends UserModel {


// update thông tin người dùng (admin)
    static updateInfoUser(_id, displayName, phone)
    {
        return new Promise((resolve, reject) => {
            UserModel.findById(_id)
            .then(check => {
                if(check)
                {
                    UserModel.findByIdAndUpdate(_id, {
                        $set: {displayName, phone}
                    })
                    .then(user => {
                        return resolve(user);
                    })
                }
                else
                    return reject("User not exists");
            })
            .catch(err => {
                return reject(err.message)
            })
        })
    }



    // danh sach (admin)
    static listUser()
    {
        return new Promise((resolve, reject) => {
            UserModel.find()
            .then(list => {
                return resolve(list);
            })
            .catch(err => {
                return reject(err.message)
            })
        })
    }



    // doi mat khau (user)
    static updatePassword(_id, password)
    {
        return new Promise((resolve, reject) => {
            UserModel.findById(_id)
            .then(check => {
                if(check)
                {
                    hash(password)
                    .then(hashPassword => {
                         UserModel.findByIdAndUpdate(_id, {
                            $set: {password: hashPassword}
                            })
                        .then(user => {
                            return resolve(user);
                        })
                    })
                    .catch(err => {
                        return reject(err.message);
                    })
                    
                }
                else
                    return reject("User not exists");
            })
            .catch(err => {
                return reject(err.message)
            })
        })
    }


    // xoa tai khoan (admin)
    static deleteUser(_id)
    {
        return new Promise((resolve, reject) => {
            UserModel.findById(_id)
            .then(user => {
                if(user)
                {
                    BookingModel.find({idUser: user._id})
                    .then(booking => {
                        // xoa dat cho
                        booking.forEach(bk => {
                            Booking.deleteBooking(bk._id)
                            .then(() => {})
                        })
                        UserModel.findByIdAndDelete(_id)
                            .then(() => {
                                return resolve();
                            })
                    })
                    .catch(err => {
                        return reject(err.message)
                    })
                }
                else
                    return reject("User not exists");
            })
            .catch(err => {
                return reject(err.message)
            })
        })
    }


    // cap nhat level (admin)
    static updateLevel(_id, level)
    {
        return new Promise((resolve, reject) => {
            UserModel.findById(_id)
            .then(check => {
                if(check)
                {
                    UserModel.findByIdAndUpdate(_id, {
                        $set: {
                            role : level
                        }
                    })
                    .then(user => {
                        return resolve(user);
                    })
                }
                else
                    return reject("User not exists");
            })
            .catch(err => {
                return reject(err.message)
            })
        })
    }


    //Dang ky - user 
    static signUp(email, name, password, phone) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email })
                .then(checkUser => {
                    if (checkUser)
                        return reject(new Error('Email existed!'))
                    else {
                        hash(password)
                            .then(hashPassword => {
                                return UserModel.create({
                                    email, displayName: name, password: hashPassword,  phone
                                });
                            })
                            .then(user => {
                                if (!user)
                                    return reject(new Error('Data incorrect'));
                                return resolve({ _id: user._id, email: user.email, displayName: user.name})
                            })
                            .catch(err => {
                                return reject(err.message);//'Please try again!'
                            })
                    }
                })
                .catch(err => {
                    return reject(new Error('Please try again! 3'))//'Please try again!'
                })
        })
    }

    // Dang nhap - user
    static signIn(email, password) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email })
                .then(user => {
                    if (!user)
                        return reject(new Error('Can not find user!'));
                    else {
                        compare(password, user.password)
                            .then(checkPassword => {
                                if (checkPassword) {
                                    sign({ _id: user._id })
                                        .then(token => {
                                            const userInfo = user.toObject();
                                            delete userInfo.password;
                                            userInfo.token = token;
                                            return resolve(userInfo);
                                        })
                                        .catch(err => { return reject(new Error(err.message)) })
                                }
                                else
                                    return reject(new Error("User or Password incorrect"))
                            })
                            .catch(err => {
                                return reject(err.message);
                            })
                    }
                })
                .catch(err => {
                    return reject(err.message);
                })
        })
    }



    // doi anh
    static async changeAvatar(_id, avatar){
        const user = await UserModel.findOneAndUpdate(
            { _id },
            { avatar },
            { new: true}
        )
        if(!user) throw new Error('Can not find user!')
        return {
            _id: user._id,
            displayName: user.displayName,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        };
    }

    

    //Tim kiem user
    static async findUser(_id){
        const user = await UserModel.findById(_id)
        if(!user) throw new Error('Can not find user!')
        return {
            _id: user._id,
            displayName: user.displayName,
            email: user.email,
            role: user.role,
            phone: user.phone,
            avatar: user.avatar,
        };
    }
}


module.exports = {User, UserModel};