const Photos = require('../controllers/photo');

const totalUsers = (parent, args) => {
    return 10
}

const me =(_,__,{currentUser})=>{
    if(currentUser) return currentUser
    else return new Error("User not logged in")
}

const allPhotos= async ()=>Photos.allPhotos();

module.exports ={
    totalUsers,
    me,
    allPhotos
}