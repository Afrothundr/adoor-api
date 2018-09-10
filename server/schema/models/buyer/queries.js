import { GraphQLList } from 'graphql';

const Buyer = require('../../../models/buyer/buyer.model');

export const buyer = {
    type: require('./types').buyerType,
    resolve(_, args, { user }) {
        if(!user) throw new Error('Not Authenticated!');
        return Buyer.findById(user.id);
    }
}

export const buyers = {
    type: new GraphQLList(require('./types').buyerType),
    resolve() {
        return Buyer.find({});
    }
}
