const mongoose = require('mongoose');

const { String, Number } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true,
    },
    avatar_url: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        trim: true,
    },

}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
})

module.exports = mongoose.model("User", UserSchema);