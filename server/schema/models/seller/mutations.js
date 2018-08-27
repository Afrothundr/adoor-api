import { GraphQLID, GraphQLNonNull } from 'graphql';
import { sellerInputType } from './types';

const Seller = require('../../../models/seller/seller.model');

export const createSeller = {
    type: require('./types').sellerType,
    args: {
        input: { type: new GraphQLNonNull(sellerInputType) }
    },
    resolve: (parent, { input }) => {
        const newSeller = new Seller({
            firstName: input.firstName,
            lastName: input.lastName,
            bio: input.bio,
            phoneNumber: input.phoneNumber,
            password: input.password,
            email: input.email,
            company: input.company,
            profilePicture: input.profilePicture
        });

        return newSeller.save();
    }
}