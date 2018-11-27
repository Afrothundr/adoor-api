import { GraphQLList } from 'graphql';

const Buyer = require('../../../models/buyer/buyer.model');

const buyer = {
    type: require('./types').buyerType,
    resolve(_, args, { user }) {
        if(!user) throw new Error('Not Authenticated!');
        return Buyer.findById(user.id);
    }
}

const buyers = {
    type: new GraphQLList(require('./types').buyerType),
    async resolve(_, { apiKey }, { user }) {
        return Buyer.find({});
    }
}

export const buyerQueries = {
    buyer: buyer,
    buyers: buyers,
}