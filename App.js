require('dotenv').config()
const express = require('express');
const { createServer } = require('http')
const { ApolloServer } = require('apollo-server-express');
const { readFileSync } = require('fs')
const db = require('./app/database')
const resolvers = require('./app/resolvers/index')
const expressPlayground = require('graphql-playground-middleware-express').default
const context = require('./app/utils/context')
const typeDefs = readFileSync('./app/typeDefs/schema.graphql', 'UTF-8')

var app = express()
var httpServer = createServer(app)

db.connectDB()
    .then(() => {
        const server = new ApolloServer({ typeDefs, resolvers, context })

        server.applyMiddleware({ app })

        app.get('/', (req, res, next) => {
            res.send("Welcome To Photo Share GraphQL API")
        })
        app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
        server.installSubscriptionHandlers(httpServer)
        httpServer.timeout = 5000,
            httpServer.listen({ port: process.env.PORT }, (args) => { console.log(`http://localhost:${process.env.PORT}`) })
        // app.listen({ port: process.env.PORT }, (args) => { console.log(`http://localhost:${process.env.PORT}`) })
    })