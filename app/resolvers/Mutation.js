const GitHub = require('../utils/github');
const User = require('../controllers/user');

const githubAuth = async (parent, { code }) => {
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
    const responce = await User.UserAuth({ id, login, name, email, avatar_url },access_token)
        .then(user => {
            return {
                user,
                token: access_token,
            }
        })
        .catch(err=>err)
    console.log(responce)
    return responce;
}

module.exports = {
    githubAuth
}