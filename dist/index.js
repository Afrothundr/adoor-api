'use strict';

var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./schema/schema');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();

app.use(cors());

//connect to database
mongoose.connect('mongodb://admin:adoorR0cks@ds231501.mlab.com:31501/adoor-api_dev', { useNewUrlParser: true });
mongoose.connection.once('open', function () {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true
}));

app.listen(4000, function () {
    console.log('now listening for requests on port 4000');
});