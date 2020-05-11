require('dotenv').config()
const mongoose = require('mongoose')
const env = process.env.NODE_ENV || "development"
const Production_URL = process.env.MONGODB_URL
const development_URL = process.env.DEVELOPMENT_URL
const config = require('./config.json')

const connectDB = async () => {
    console.log("connecting")
    try {
        const URL = env === "development" ? development_URL : Production_URL;
        console.log(env)
        await mongoose.connect(URL, config)
        console.log("connected")
    } catch (e) {
        console.error("Error:", e)
        process.exit(1)
    }
}
module.exports = {
    connectDB,
} 