import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
const mongoose = require('mongoose');
import cors from 'cors';
const app = express();

app.use(cors());


//connect to database
// mongoose.connect('mongodb://admin:adoorR0cks@ds231501.mlab.com:31501/adoor-api_dev', {useNewUrlParser: true});
mongoose.connect("mongodb://localhost:27017/adoor-dev", {useNewUrlParser: true});

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
