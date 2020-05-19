const cloudinary = require('cloudinary').v2
const { CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } = process.env
console.log(CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, CLOUD_NAME)
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const uploadImage = (filename, stream) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(stream)
            .then(responce => {
                console.log("res", responce)
                resolve(responce)
            })
            .catch(err => {
                console.error("err", err)
                reject(err)
            })
    })
}

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
    uploadImage,
    uploadStream
}
