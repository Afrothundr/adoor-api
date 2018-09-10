import { GraphQLList } from 'graphql';
const Seller = require('../../../models/seller/seller.model');

export const seller = {
    type: require('./types').sellerType,
    resolve(_, args, { user }) {
        if (!user) throw new Error('Not Authenticated!');
        return Seller.findById(user.id);
    }
}

export const sellers = {
    type: new GraphQLList(require('./types').sellerType),
    resolve() {
        return Seller.find({});
    }
}