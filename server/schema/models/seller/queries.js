import { GraphQLList, GraphQLBoolean, GraphQLString } from 'graphql';
const Seller = require('../../../models/seller/seller.model');

const seller = {
    type: require('./types').sellerReturnType,
    resolve(_, args, { user }) {
        if (!user) throw new Error('Not Authenticated!');
        return Seller.findById(user.id);
    }
}

const sellers = {
    type: new GraphQLList(require('./types').sellerReturnType),
    resolve() {
        return Seller.find({});
    }
}

const isSellerEmailAvailable = {
    type: GraphQLBoolean,
    args: { email: { type: GraphQLString } },
    resolve(_, { email }) {
        return Seller.findOne({ email: email }).then((result) => {
            return result ? false : true;
        }).catch(err => {
            throw new Error(err);
        });
    }
}

export const sellerQueries = {
    seller: seller,
    sellers: sellers,
    isSellerEmailAvailable: isSellerEmailAvailable
}