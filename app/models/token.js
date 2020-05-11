const mongoose = require('mongoose')

const { String, Number, ObjectId, Date } = mongoose.Schema.Types

const tokenSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        required: true,
        unique:true,
        ref: 'User'
    }
},
    {
        timestamps: {
            updatedAt: "updatedAt",
            createdAt: "createdAt",
        }
    }
)

module.exports = mongoose.model('Token', tokenSchema)