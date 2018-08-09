import { GraphQLSchema } from 'graphql';
import { RootMutation } from './models/buyer/mutations';
import { RootQuery } from './models/buyer/queries';

const Buyer = require('../models/buyer/buyer.model');

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})