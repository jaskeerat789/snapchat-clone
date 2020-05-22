const { } = require('graphql');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const Users = require('../models/user');
const Photos = require('../models/photo');

module.exports = {
    Photo: {
        id: parent => parent._id || parent.id,
        url: parent => parent.url,
        name: parent => parent.name,
        description: parent => parent.description || null,
        category: parent => parent.category || null,
        postedBy: ({ postedBy }) =>postedBy,
        taggedUsers: ({taggedUsers}) =>taggedUsers,
        created: parent => parent.createdAt
    },
    User:{
        inPhotos:async parent=>{
            return Photos.find({taggedUsers:parent._id}).exec()
            .then(photos=>photos)
            .catch(err=>new Error(err))
        }
    }
}