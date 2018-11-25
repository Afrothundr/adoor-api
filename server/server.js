import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
const mongoose = require('mongoose');
import cors from 'cors';
const app = express();
const jwt = require('express-jwt');
require('dotenv').config();

app.use(cors());

const auth = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
})
//connect to database
const mongoUserCredentials = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_CONNECTION_STRING = `mongodb://${mongoUserCredentials}${MONGO_URL}/${DB_NAME}`;

MONGO_URL ? mongoose.connect(MONGO_CONNECTION_STRING,  {useNewUrlParser: true}) : mongoose.connect("mongodb://localhost:27017/adoor-dev", { useNewUrlParser: true });


mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/api', auth, graphqlHTTP(req => ({
    schema,
    pretty: true,
    graphiql: true
})));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
})
