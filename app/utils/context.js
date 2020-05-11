
const Token = require("../models/token")
module.exports = async ({ req }) => {
    const token = req.headers.authorization
    user = await Token.findOne({ token }).populate('user').exec()
    if (user) return { currentUser: user.user }
    else return { currentUser: null }
}