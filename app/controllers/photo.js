const mongoose = require('mongoose');
const Photos = require('../models/photo');
const cloudinary = require('./cloudinary');

const PostPhoto = async ({ createReadStream, mimetype, filename }, { description, category, postedBy, taggedUsers }) => {
    return new Promise((resolve, reject) => {
        if (mimetype.startsWith("image")) {
            const stream = createReadStream()
            const _id = new mongoose.Types.ObjectId()
            cloudinary.uploadStream(stream)
                .then(res => {
                    console.log("saving Photo")
                    console.log(postedBy)
                    const photo = new Photos({
                        _id,
                        name: filename,
                        url: res.url,
                        description,
                        postedBy,
                        taggedUsers,
                        category,
                    });
                    photo.save()
                        .then(saved => {
                            // console.log(saved);
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


module.exports = {
    PostPhoto,
}