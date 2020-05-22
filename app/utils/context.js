const Token = require("../models/token")
const {PubSub} = require('apollo-server-express')
const pubsub = new PubSub()
module.exports = async ({ req }) => {

    const token = req.headers.authorization
    user = await Token.findOne({ token }).populate('user').exec()
    if (user) return { currentUser: user.user,pubsub }
    else return { currentUser: null,pubsub }
}