const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

//connect to database
mongoose.connect('mongodb://admin:test123@ds123171.mlab.com:23171/ninja-tut');
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
})
