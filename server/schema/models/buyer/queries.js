import { GraphQLID, GraphQLList } from 'graphql';

const Buyer = require('../../../models/buyer/buyer.model');

export const buyer = {
    type: require('./types').buyerType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return Buyer.findById(args.id);
    }
}

export const buyers = {
    type: new GraphQLList(require('./types').buyerType),
    resolve() {
        return Buyer.find({});
    }
}