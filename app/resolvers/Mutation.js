const GitHub = require('../utils/github');
const User = require('../controllers/user');
const Photo = require('../controllers/photo');

const githubAuth = async (parent, { code }, { pubsub }) => {
    let {
        message,
        access_token,
        avatar_url,
        login,
        name,
        email,
        id
    } = await GitHub.authorizeWithGithub({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code
    })
    if (message) {
        throw new Error(message)
    }
    const responce = await User.UserAuth({ id, login, name, email, avatar_url }, access_token)
        .then(user => {
            return {
                user,
                token: access_token,
            }
        })
        .catch(err => err)
    pubsub.publish('new_user', { newLogin: responce })
    return responce;
}

const postPhoto = async (_, args, { currentUser, pubsub }) => {
    if (currentUser) {
        const { createReadStream, filename, mimetype } = await args.input.file
        return Photo.PostPhoto({ createReadStream, filename, mimetype }, { ...args.input, postedBy: currentUser._id })
            .then(upload => {
                pubsub.publish('photo-added', { upload })
                return upload
            })
            .catch(err => new Error(err))
    }
    else {
        return new Error("User not Logged in")
    }
}

module.exports = {
    githubAuth,
    postPhoto,
}