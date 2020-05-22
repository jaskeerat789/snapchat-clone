module.exports = {
    newPhoto: {
        subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('photo-added')
    },
    newLogin:{
        subscribe:(_,__,{pubsub})=>pubsub.asyncIterator("new_user")
    }
}