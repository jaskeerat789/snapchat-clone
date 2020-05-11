const mongoose = require('mongoose');
const User = require('../models/user');
const Token = require('../models/token');
const { ObjectId } = mongoose.Types

const UserAuth = (values, token) => {
    return new Promise((resolve, reject) => {
        User.findOne({ id: values.id }, (err, user) => {
            if (err) {
                reject(err)
            }

            if (user) {
                User.findByIdAndUpdate(user._id, { ...values }, { new: true }).exec()
                    .then(responce => {
                        TokenMgmt(user._id, token)
                            .then(() => {
                                resolve(responce)
                            })
                            .catch(err => reject(err))
                    })
                    .catch(err => reject(err))
            }

            else {
                const newUser = new User({ ...values })
                newUser.save().then(responce => {
                    TokenMgmt(responce._id, token)
                        .then(() => resolve(responce))
                        .catch(err => reject(err))
                }).catch(err => reject(err))
            }
        })
    })
}

const TokenMgmt = (userId, newToken) => {
    return new Promise((resolve, reject) => {
        Token.findOne({ user: userId },
            (err, existingToken) => {
                if (err)
                    reject(err)
                if (existingToken)

                    Token.updateOne({_id:existingToken._id }, { $set: { token: newToken } }, (error, updates) => {
                        if (error)
                            reject(error)
                        if (updates)
                            resolve(updates)
                    })

                else {
                    const createToken = new Token({ _id: new ObjectId(), token:newToken, user: userId })
                    createToken.save()
                        .then(update => {
                            resolve(update)
                        })
                        .catch(error => reject(error))
                }
            })
    })
}

module.exports = {
    UserAuth
}