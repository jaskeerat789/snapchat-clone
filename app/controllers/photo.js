const mongoose = require('mongoose');
const Photos = require('../models/photo');
const cloudinary = require('./cloudinary');
const user = require('./user');

const PostPhoto = async ({ createReadStream, mimetype, filename }, { description, category, postedBy, taggedUsers, name }) => {
    return new Promise(async (resolve, reject) => {
        if (mimetype.startsWith("image")) {
            const tagged_users= await user.taggedUsers(taggedUsers)
            const stream = createReadStream()
            const _id = new mongoose.Types.ObjectId()
            cloudinary.uploadStream(stream)
                .then(res => {
                    console.log("saving Photo")
                    const photo = new Photos({
                        _id,
                        name: name || filename,
                        url: res.url,
                        description,
                        postedBy,
                        taggedUsers:tagged_users,
                        category,
                    });
                    photo.save()
                        .then(saved => {
                            console.log(saved)
                            return resolve (saved);
                        })
                        .catch(err => {
                            console.log(err)
                            
                        })

                })
                .catch(err =>reject(err))
        }
        else return reject(err);
    })

}

const allPhotos =()=>Photos.find().populate('postedBy').populate('taggedUsers').exec().then(photos=>photos).catch(err=>new Error(err))
module.exports = {
    PostPhoto,
    allPhotos,
}