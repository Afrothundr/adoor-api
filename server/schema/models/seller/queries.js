import { GraphQLID, GraphQLList } from 'graphql';
const Seller = require('../../../models/seller/seller.model');

export const seller = {
    type: require('./types').sellerType,
    args: { id: { type: GraphQLID} },
    resolve(parent, args) {
        return Seller.findById(args.id);
    }
}

export const sellers = {
    type: new GraphQLList(require('./types').sellerType),
    resolve() {
        return Seller.find({});
    }
}