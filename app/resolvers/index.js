const Query = require('./Query');
const Mutation = require('./Mutation');
const Subscription = require('./Subscription');
const Types = require('./Types');

module.exports ={
    Query,
    Mutation,
    Subscription,
    ...Types,
}