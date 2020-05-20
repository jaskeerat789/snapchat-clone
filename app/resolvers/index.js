const Query = require('./Query');
const Mutation = require('./Mutation');
const Types = require('./Types')
module.exports ={
    Query,
    Mutation,
    ...Types,
}