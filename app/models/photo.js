const mongoose = require('mongoose')

const {String,ObjectId} = mongoose.Schema.Types

const PhotoSchema = new mongoose.Schema({
    _id:{
        type:ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    postedBy:{
        type:ObjectId,
        required:true,
        ref:"User"
    },
    taggedUsers:[{
        type:ObjectId,
        ref:"User"
    }],
},{
    timestamps:{
        createdAt:'creactedAt',
        updatedAt:'updatedAt'
    }
})

module.exports = mongoose.model("Photos",PhotoSchema)