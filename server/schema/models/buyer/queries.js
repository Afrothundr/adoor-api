import { GraphQLList, GraphQLBoolean, GraphQLString } from 'graphql';

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

const isBuyerEmailAvailable = {
    type: GraphQLBoolean,
    args: { email: { type: GraphQLString } },
    resolve(_, { email }) {
        return Buyer.findOne({ email: email }).then((result) => {
            return result ? false : true;
        }).catch(err => {
            throw new Error(err);
        });
    }
}

export const buyerQueries = {
    buyer: buyer,
    buyers: buyers,
    isBuyerEmailAvailable: isBuyerEmailAvailable
}