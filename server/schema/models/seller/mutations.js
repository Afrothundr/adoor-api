import { GraphQLID, GraphQLNonNull } from 'graphql';
import { sellerInputType } from './types';
const bcrypt = require('bcrypt');

const Seller = require('../../../models/seller/seller.model');

export const createSeller = {
    type: require('./types').sellerType,
    args: {
        input: { type: new GraphQLNonNull(sellerInputType) }
    },
    resolve: async (parent, { input }) => {
        const newSeller = new Seller({
            firstName: input.firstName,
            lastName: input.lastName,
            bio: input.bio,
            phoneNumber: input.phoneNumber,
            password: await bcrypt.hash(input.password, 10),
            email: input.email,
            company: input.company,
            profilePicture: input.profilePicture
        });
        return newSeller.save();
    }
}

export const updateSeller = {
    type: require('./types').sellerType,
    args: {
        id: { type: GraphQLID },
        update: { type: sellerInputType }
    },
    resolve: (parent, { id, update }) => {
        return Seller.findOneAndUpdate({ _id: id }, update, (err, res) => {
            if (err) {
                return err;
            }
            return res;
        })
    }
}