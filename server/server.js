const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema').default;
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());

//connect to database
mongoose.connect('mongodb://admin:adoorR0cks@ds231501.mlab.com:31501/adoor-api_dev', {useNewUrlParser: true});
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
