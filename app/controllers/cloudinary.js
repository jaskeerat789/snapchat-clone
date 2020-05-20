const cloudinary = require('cloudinary').v2
const { CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } = process.env
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const uploadStream = (stream) => {
    console.log("uploading stream")
    return new Promise((resolve, reject) => {
        var upload_stream = cloudinary.uploader.upload_stream({ tags: 'basic_sample' }, function (err, image) {
            if (err) { 
                console.warn(err);
                return reject(err);
            }
            return resolve({url:image.url,public_id:image.public_id})
        });
        var file_reader = stream.pipe(upload_stream);
    })
}

module.exports = {
    uploadStream
}
