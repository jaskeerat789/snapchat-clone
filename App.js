require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { readFileSync } = require('fs')
const db = require('./app/database')
const resolvers = require('./app/resolvers/index')
const expressPlayground = require('graphql-playground-middleware-express').default
const context = require('./app/utils/context')
const typeDefs = readFileSync('./app/typeDefs/schema.graphql', 'UTF-8')

var app = express()
db.connectDB()
    .then(() => {
        const server = new ApolloServer({ typeDefs, resolvers, context })

        server.applyMiddleware({ app })

        app.get('/', (req, res, next) => {
            res.send("Welcome To Photo Share GraphQL API")
        })
        app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

        app.listen({ port: process.env.PORT }, (args) => { console.log(`http://localhost:${process.env.PORT}`)})
    })